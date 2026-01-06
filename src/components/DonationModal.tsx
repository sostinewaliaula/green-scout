import React, { useState, useEffect } from 'react';
import { XIcon, HeartIcon, LeafIcon, BarChart3Icon, CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';
import sanityClient from '../sanityClient';

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ImpactData {
    totalRaised: number;
    targetGoal: number;
    treesPlanted: number;
    usageDetails: Array<{
        activity: string;
        description: string;
        cost: number;
        date: string;
    }>;
}

interface DonationSettings {
    title: string;
    description: string;
    showPhoneField?: boolean;
    nameLabel?: string;
    emailLabel?: string;
    phoneLabel?: string;
    presetAmounts: number[];
    successTitle: string;
    successMessage: string;
    purposes: Array<{ label: string; value: string }>;
    paystackPublicKey?: string;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
    const [amount, setAmount] = useState<number>(10);
    const [isCustomAmount, setIsCustomAmount] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [purpose, setPurpose] = useState('tree');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [impactData, setImpactData] = useState<ImpactData | null>(null);
    const [settings, setSettings] = useState<DonationSettings | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch Impact & Settings
    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            Promise.all([
                sanityClient.fetch('*[_type == "donationImpact"][0]'),
                sanityClient.fetch('*[_type == "donationSettings"][0]'),
                sanityClient.fetch('*[_type == "siteSettings"][0]{paystackPublicKey}')
            ]).then(([impact, donationSet, siteSet]) => {
                setImpactData(impact);
                setSettings({
                    ...donationSet,
                    paystackPublicKey: siteSet?.paystackPublicKey
                });

                if (donationSet?.presetAmounts?.length > 0) {
                    setAmount(donationSet.presetAmounts[0]);
                }
                if (donationSet?.purposes?.length > 0) {
                    setPurpose(donationSet.purposes[0].value);
                }

                setLoading(false);
            }).catch((err: Error) => {
                console.error('Error fetching donation data:', err);
                setLoading(false);
            });
        }
    }, [isOpen]);

    const publicKey = settings?.paystackPublicKey || import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';

    const config = {
        reference: (new Date()).getTime().toString(),
        email: email || 'donor@example.com',
        amount: amount * 100, // Paystack expects amount in cents/pesa (KES 1.00 = 100)
        publicKey: publicKey,
        currency: 'KES',
    };

    const initializePayment = usePaystackPayment(config);

    const onSuccess = (reference: any) => {
        setIsProcessing(false);
        setIsSuccess(true);

        sanityClient.create({
            _type: 'donation',
            donorName: name,
            donorEmail: email,
            donorPhone: phone,
            amount: amount,
            purpose: purpose,
            paystackReference: reference.reference,
            status: 'success',
            submittedAt: new Date().toISOString()
        }).then(() => {
            console.log('Donation recorded');
        }).catch((err: Error) => {
            console.error('Failed to record:', err);
        });

        setTimeout(() => {
            setIsSuccess(false);
            onClose();
        }, 3000);
    };

    const handleDonate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            alert('Please enter your email');
            return;
        }
        setIsProcessing(true);
        initializePayment({ onSuccess, onClose: () => setIsProcessing(false) });
    };

    if (!isOpen) return null;

    const presets = settings?.presetAmounts || [500, 1000, 2000, 5000, 10000];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 rounded-full transition-colors"
                >
                    <XIcon className="w-5 h-5" />
                </button>

                {/* Left Side: Impact Track */}
                <div className="w-full md:w-5/12 bg-gray-50 dark:bg-gray-800/50 p-6 md:p-10 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                            <LeafIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Impact</h3>
                            <p className="text-sm text-gray-500">Live transparency dashboard</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center py-20">
                            <Loader2Icon className="w-10 h-10 text-green-600 animate-spin mb-4" />
                            <p className="text-gray-500 text-sm">Loading data...</p>
                        </div>
                    ) : impactData ? (
                        <div className="space-y-8">
                            {/* Stats */}
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3 mb-3">
                                        <BarChart3Icon className="w-4 h-4 text-purple-600" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Raised (KES)</span>
                                    </div>
                                    <div className="text-3xl font-black text-gray-900 dark:text-white">KSh {impactData.totalRaised.toLocaleString()}</div>
                                    {impactData.targetGoal && (
                                        <div className="mt-4">
                                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-500 to-purple-600 rounded-full transition-all duration-1000"
                                                    style={{ width: `${Math.min((impactData.totalRaised / impactData.targetGoal) * 100, 100)}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 uppercase">
                                                <span>{Math.round((impactData.totalRaised / impactData.targetGoal) * 100)}% reach</span>
                                                <span>Goal: KSh {impactData.targetGoal.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3 mb-3">
                                        <HeartIcon className="w-4 h-4 text-green-600 fill-green-600" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Trees Planted</span>
                                    </div>
                                    <div className="text-3xl font-black text-gray-900 dark:text-white">{impactData.treesPlanted.toLocaleString()}</div>
                                    <p className="text-[10px] text-green-600 font-bold mt-2 uppercase">Verified by communities</p>
                                </div>
                            </div>

                            {/* Usage History */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <BarChart3Icon className="w-4 h-4 text-gray-400" />
                                    Fund Allocation History
                                </h4>
                                <div className="space-y-3">
                                    {impactData.usageDetails?.slice(0, 3).map((item, i) => (
                                        <div key={i} className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700/50">
                                            <div className="flex justify-between items-start mb-1">
                                                <h5 className="font-bold text-gray-900 dark:text-white text-xs">{item.activity}</h5>
                                                <span className="text-[10px] text-gray-400 tabular-nums">{new Date(item.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 leading-relaxed mb-2">{item.description}</p>
                                            <div className="text-[10px] font-bold text-purple-600 uppercase tracking-tighter">
                                                KSh {item.cost.toLocaleString()} Allocated
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Right Side: Donation Form */}
                <div className="w-full md:w-7/12 p-6 md:p-10 overflow-y-auto">
                    {isSuccess ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2Icon className="w-12 h-12 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {settings?.successTitle || 'Thank You for Planting Hope!'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto text-center">
                                {settings?.successMessage || 'Together, we are creating a greener, more sustainable future for Kenya.'}
                                <br />
                                <span className="mt-4 block font-black text-green-600 dark:text-green-400">
                                    Amount: KSh {amount.toLocaleString()}
                                </span>
                            </p>
                        </div>
                    ) : (
                        <div className="h-full">
                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{settings?.title || 'Support Green Scout'}</h3>
                                <p className="text-gray-500 text-sm">{settings?.description || 'Choose an amount and purpose for your donation.'}</p>
                            </div>

                            <form onSubmit={handleDonate} className="space-y-6">
                                {/* Amount Selection */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Select Amount (KES)</label>
                                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                                        {presets.map(p => (
                                            <button
                                                key={p}
                                                type="button"
                                                onClick={() => { setAmount(p); setIsCustomAmount(false); }}
                                                className={`py-2.5 rounded-xl border-2 transition-all font-black text-sm ${amount === p && !isCustomAmount
                                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                                                    : 'border-gray-50 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-900/50 text-gray-400 dark:text-gray-500'
                                                    }`}
                                            >
                                                KSh {p >= 1000 ? `${p / 1000}k` : p}
                                            </button>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setIsCustomAmount(true)}
                                            className={`py-2.5 rounded-xl border-2 transition-all font-black text-sm ${isCustomAmount
                                                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                                                : 'border-gray-50 dark:border-gray-800 hover:border-purple-200 text-gray-400'
                                                }`}
                                        >
                                            Other
                                        </button>
                                    </div>
                                    {isCustomAmount && (
                                        <div className="relative animate-in slide-in-from-top-2">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs uppercase">KSh</span>
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(Number(e.target.value))}
                                                className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all dark:text-white font-bold"
                                                placeholder="Amount"
                                                min="1"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Donor Details Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                            {settings?.nameLabel || 'Display Name'}
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all dark:text-white"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                            {(settings?.emailLabel || 'Email Address') + ' *'}
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all dark:text-white"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {settings?.showPhoneField !== false && (
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                            {settings?.phoneLabel || 'Phone Number (Optional)'}
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all dark:text-white"
                                            placeholder="+254 700 000 000"
                                        />
                                    </div>
                                )}

                                {/* Purpose */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Allocate my gift to:</label>
                                    <select
                                        value={purpose}
                                        onChange={(e) => setPurpose(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all dark:text-white appearance-none cursor-pointer"
                                    >
                                        {settings?.purposes?.map(p => (
                                            <option key={p.value} value={p.value}>{p.label}</option>
                                        )) || (
                                                <>
                                                    <option value="tree">General Tree Planting</option>
                                                    <option value="schools">School Environmental Clubs</option>
                                                    <option value="training">Youth Green Skills Training</option>
                                                    <option value="general">Green Scout Core Mission</option>
                                                </>
                                            )}
                                    </select>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full py-5 bg-gradient-to-r from-green-600 to-purple-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-purple-500/20 transition-all active:scale-[0.98] disabled:opacity-50 group"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2Icon className="w-6 h-6 animate-spin" />
                                                Preparing Secure Link...
                                            </>
                                        ) : (
                                            <>
                                                <HeartIcon className="w-6 h-6 fill-white group-hover:scale-125 transition-transform" />
                                                Donate KSh {amount.toLocaleString()} Now
                                            </>
                                        )}
                                    </button>
                                    <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
                                        <div className="h-px w-8 bg-gray-200 dark:bg-gray-800" />
                                        <span className="text-[10px] uppercase font-bold tracking-widest">Secure via Paystack</span>
                                        <div className="h-px w-8 bg-gray-200 dark:bg-gray-800" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
