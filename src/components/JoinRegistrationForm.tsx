import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import {
    SendIcon,
    CheckCircle2Icon,
    ChevronDownIcon,
    SearchIcon,
    XIcon
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import sanityClient from '../sanityClient';
import { useJoinModal } from '../context/JoinModalContext';

// Helper to render Lucide icons dynamically
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // @ts-ignore
    const IconComponent = Icons[name] || Icons.HelpCircle;
    return <IconComponent className={className} />;
};

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'number' | 'radio' | 'select' | 'textarea' | 'date' | 'countyDropdown' | 'constituencyDropdown' | 'rankDropdown';
    placeholder?: string;
    required?: boolean;
    options?: string[];
    icon?: string;
    showIf?: {
        fieldName: string;
        value: string;
    };
}

interface FormSection {
    title: string;
    icon: string;
    fields: FormField[];
}

interface FormSchema {
    title: string;
    description: string;
    successTitle: string;
    successMessage: string;
    sections: FormSection[];
}

interface CountyData {
    name: string;
    constituencies: string[];
}

export function JoinRegistrationForm({ formId = 'volunteer-form' }: { formId?: string }) {
    const { closeJoinModal } = useJoinModal();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [schema, setSchema] = useState<FormSchema | null>(null);
    const [geography, setGeography] = useState<CountyData[]>([]);
    const [config, setConfig] = useState<{
        notificationEmails: string[];
        serviceId: string;
        templateId: string;
        applicantTemplateId: string;
        publicKey: string;
        sanityWriteToken: string;
    } | null>(null);

    const [formData, setFormData] = useState<Record<string, string>>({});

    // Search states for dropdowns
    const [countySearch, setCountySearch] = useState('');
    const [isCountyDropdownOpen, setIsCountyDropdownOpen] = useState(false);
    const countyDropdownRef = useRef<HTMLDivElement>(null);

    const [constituencySearch, setConstituencySearch] = useState('');
    const [isConstituencyDropdownOpen, setIsConstituencyDropdownOpen] = useState(false);
    const constituencyDropdownRef = useRef<HTMLDivElement>(null);

    // Derived geography data
    const filteredCounties = geography
        .map(c => c.name)
        .filter(name => name.toLowerCase().includes(countySearch.toLowerCase()))
        .sort();

    const currentCountyData = geography.find(c => c.name === formData.county);
    const availableConstituencies = currentCountyData?.constituencies || [];
    const filteredConstituencies = availableConstituencies
        .filter(name => name.toLowerCase().includes(constituencySearch.toLowerCase()))
        .sort();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countyDropdownRef.current && !countyDropdownRef.current.contains(event.target as Node)) {
                setIsCountyDropdownOpen(false);
            }
            if (constituencyDropdownRef.current && !constituencyDropdownRef.current.contains(event.target as Node)) {
                setIsConstituencyDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const queries = [
            `*[_type == "siteSettings"][0]{
                notificationEmails,
                emailjsServiceId,
                emailjsTemplateId,
                emailjsApplicantTemplateId,
                emailjsPublicKey,
                sanityWriteToken
            }`,
            `*[_type == "registrationForm" && slug.current == $formId][0]`,
            `*[_type == "kenyanGeography"][0]`
        ];

        Promise.all(queries.map(q => sanityClient.fetch(q, { formId })))
            .then(([settings, formSchema, geoData]) => {
                setConfig({
                    notificationEmails: settings?.notificationEmails || [],
                    serviceId: settings?.emailjsServiceId || '',
                    templateId: settings?.emailjsTemplateId || '',
                    applicantTemplateId: settings?.emailjsApplicantTemplateId || '',
                    publicKey: settings?.emailjsPublicKey || '',
                    sanityWriteToken: settings?.sanityWriteToken || ''
                });
                setSchema(formSchema);
                setGeography(geoData?.counties || []);

                // Initialize form data
                if (formSchema?.sections) {
                    const initialData: Record<string, string> = {};
                    formSchema.sections.forEach((section: FormSection) => {
                        section.fields.forEach((field: FormField) => {
                            initialData[field.name] = '';
                        });
                    });
                    setFormData(initialData);
                }
            })
            .catch(err => console.error('Error fetching dynamic form data:', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const serviceId = config?.serviceId || import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const adminTemplateId = config?.templateId || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const applicantTemplateId = config?.applicantTemplateId;
        const publicKey = config?.publicKey || import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const sId = (serviceId || '').trim();
        const tId = (adminTemplateId || '').trim();
        const pKey = (publicKey || '').trim();

        if (!sId || !tId || !pKey) {
            console.error('EmailJS configuration missing');
            setStatus('error');
            return;
        }

        setStatus('submitting');

        try {
            const rawEmails = config?.notificationEmails || [];
            const validEmails = rawEmails.filter(email => email && typeof email === 'string' && email.trim() !== '');
            const finalRecipients = validEmails.length > 0 ? validEmails : ['info@greenscout.org'];

            emailjs.init(pKey);

            // Construct template params dynamically from formData
            const baseParams = {
                reply_to: formData.email || '',
                from_name: formData.name || '',
                from_email: formData.email || '',
                ...formData // Spread all dynamic fields
            };

            // 1. Send individual emails to all admin recipients
            const adminPromises = finalRecipients.map(recipientEmail => {
                return emailjs.send(sId, tId, {
                    ...baseParams,
                    to_email: recipientEmail
                });
            });

            // 2. Send automated reply to applicant if template ID is provided
            if (applicantTemplateId && formData.email) {
                const applicantPromise = emailjs.send(sId, applicantTemplateId, {
                    ...baseParams,
                    to_email: formData.email
                });
                adminPromises.push(applicantPromise);
            }

            // 3. Save to Sanity if Write Token is provided
            if (config?.sanityWriteToken) {
                const sanitySavePromise = fetch(`https://cew8k4ec.api.sanity.io/v2024-01-01/data/mutate/production`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${config.sanityWriteToken}`
                    },
                    body: JSON.stringify({
                        mutations: [
                            {
                                create: {
                                    _type: formId === 'partner-form' ? 'partner' : 'volunteer',
                                    // For Volunteer
                                    name: formData.name || '',
                                    email: formData.email || '',
                                    phone: formData.phone || '',
                                    county: formData.county || '',
                                    constituency: formData.constituency || '',
                                    gender: formData.gender || '',
                                    age: formData.age || '',
                                    isScout: formData.isScout || '',
                                    rank: formData.rank || '',
                                    school: formData.school || '',
                                    countyAssociation: formData.countyAssociation || '',
                                    // For Partner (map their fields)
                                    organizationName: formData.organizationName || '',
                                    organizationType: formData.organizationType || '',
                                    organizationTypeOther: formData.organizationTypeOther || '',
                                    regionOfOperation: formData.regionOfOperation || '',
                                    website: formData.website || '',
                                    contactPerson: formData.contactPerson || '',
                                    designation: formData.designation || '',
                                    proposedScope: formData.proposedScope || '',
                                    duration: formData.duration || '',
                                    preferredMeetingDate: formData.preferredMeetingDate || '',
                                    submittedAt: new Date().toISOString(),
                                    rawSubmission: JSON.stringify(formData, null, 2)
                                }
                            }
                        ]
                    })
                }).then(res => {
                    if (!res.ok) throw new Error('Sanity save failed');
                    return res.json();
                });
                adminPromises.push(sanitySavePromise);
            }

            await Promise.all(adminPromises);

            setStatus('success');
            // Reset form data to initials
            const resetData: Record<string, string> = { ...formData };
            Object.keys(resetData).forEach(key => resetData[key] = '');
            setFormData(resetData);
        } catch (error) {
            console.error('Email submission error:', error);
            setStatus('error');
        }
    };

    const isVisible = (field: FormField) => {
        if (!field.showIf || !field.showIf.fieldName) return true;
        const { fieldName, value } = field.showIf;
        return formData[fieldName] === value;
    };

    const renderInput = (field: FormField) => {
        switch (field.type) {
            case 'countyDropdown':
                return (
                    <div className="relative" ref={countyDropdownRef}>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <DynamicIcon name={field.icon || "MapPin"} className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                            </div>
                            <input
                                required={field.required}
                                type="text"
                                placeholder={field.placeholder || "Search County..."}
                                className="block w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none dark:text-white"
                                value={isCountyDropdownOpen ? countySearch : formData[field.name] || ''}
                                onChange={(e) => {
                                    setCountySearch(e.target.value);
                                    setIsCountyDropdownOpen(true);
                                }}
                                onFocus={() => {
                                    setCountySearch('');
                                    setIsCountyDropdownOpen(true);
                                }}
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                {isCountyDropdownOpen ? <SearchIcon className="h-4 w-4 text-green-500" /> : <ChevronDownIcon className="h-4 w-4" />}
                            </div>
                        </div>
                        {isCountyDropdownOpen && (
                            <div className="absolute z-[100] mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                                {filteredCounties.length > 0 ? (
                                    filteredCounties.map(county => (
                                        <button
                                            key={county}
                                            type="button"
                                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-700 dark:text-gray-300 transition-colors border-b border-gray-50 last:border-0 dark:border-gray-800"
                                            onClick={() => {
                                                setFormData({ ...formData, [field.name]: county, constituency: '' });
                                                setCountySearch(county);
                                                setConstituencySearch('');
                                                setIsCountyDropdownOpen(false);
                                            }}
                                        >
                                            {county}
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center text-xs text-gray-500">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                );

            case 'constituencyDropdown':
                return (
                    <div className="relative" ref={constituencyDropdownRef}>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <DynamicIcon name={field.icon || "Building"} className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                            </div>
                            <input
                                required={field.required}
                                disabled={!formData.county}
                                type="text"
                                placeholder={formData.county ? (field.placeholder || "Search Constituency...") : "Select County first"}
                                className="block w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                value={isConstituencyDropdownOpen ? constituencySearch : formData[field.name] || ''}
                                onChange={(e) => {
                                    setConstituencySearch(e.target.value);
                                    setIsConstituencyDropdownOpen(true);
                                }}
                                onFocus={() => {
                                    setConstituencySearch('');
                                    setIsConstituencyDropdownOpen(true);
                                }}
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                {isConstituencyDropdownOpen ? <SearchIcon className="h-4 w-4 text-green-500" /> : <ChevronDownIcon className="h-4 w-4" />}
                            </div>
                        </div>
                        {isConstituencyDropdownOpen && formData.county && (
                            <div className="absolute z-[100] mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                                {filteredConstituencies.length > 0 ? (
                                    filteredConstituencies.map(constituency => (
                                        <button
                                            key={constituency}
                                            type="button"
                                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-700 dark:text-gray-300 transition-colors border-b border-gray-50 last:border-0 dark:border-gray-800"
                                            onClick={() => {
                                                setFormData({ ...formData, [field.name]: constituency });
                                                setConstituencySearch(constituency);
                                                setIsConstituencyDropdownOpen(false);
                                            }}
                                        >
                                            {constituency}
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center text-xs text-gray-500">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                );

            case 'radio':
                return (
                    <div className="flex items-center gap-6 py-2 px-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl w-fit">
                        {field.options?.map(opt => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={opt.toLowerCase()}
                                    checked={formData[field.name] === opt.toLowerCase()}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{opt}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'rankDropdown':
            case 'select':
                return (
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <DynamicIcon name={field.icon || "Trophy"} className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                        </div>
                        <select
                            required={field.required}
                            className="block w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none dark:text-white appearance-none cursor-pointer"
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        >
                            <option value="" disabled>{field.placeholder || "Select"}</option>
                            {field.options?.map(opt => (
                                <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                            <ChevronDownIcon className="h-4 w-4" />
                        </div>
                    </div>
                );

            case 'textarea':
                return (
                    <div className="relative group">
                        <div className="absolute top-3 left-4 flex items-start pointer-events-none">
                            <DynamicIcon name={field.icon || "AlignLeft"} className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                        </div>
                        <textarea
                            required={field.required}
                            placeholder={field.placeholder}
                            rows={3}
                            className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none dark:text-white resize-none"
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        />
                    </div>
                );

            case 'date':
                return (
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <DynamicIcon name={field.icon || "CalendarDays"} className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                        </div>
                        <input
                            required={field.required}
                            type="date"
                            className="block w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none dark:text-white"
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        />
                    </div>
                );

            default:
                return (
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <DynamicIcon name={field.icon || "User"} className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                        </div>
                        <input
                            required={field.required}
                            type={field.type}
                            placeholder={field.placeholder}
                            className="block w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none dark:text-white"
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        />
                    </div>
                );
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 shadow-2xl border border-green-100 dark:border-green-900/30 text-center animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2Icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {schema?.successTitle || "You're on the Team!"}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-wrap">
                    {schema?.successMessage || "Thank you for joining Green Scout. Our team will reach out to you shortly."}
                </p>
                <button
                    onClick={closeJoinModal}
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-all text-sm"
                >
                    Great, thanks!
                </button>
            </div>
        );
    }

    if (!schema) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-20 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-green-600/30 border-t-green-600 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-5 md:p-8">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{schema.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{schema.description}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {schema.sections.map((section, sIdx) => (
                        <div key={sIdx} className="space-y-4">
                            <div className="flex items-center gap-3 pb-1 border-b border-gray-100 dark:border-gray-800">
                                <DynamicIcon name={section.icon || "LayoutList"} className="w-4 h-4 text-green-600" />
                                <h4 className="text-base font-semibold text-gray-900 dark:text-white tracking-tight">{section.title}</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
                                {section.fields.filter(isVisible).map((field, fIdx) => (
                                    <div key={fIdx} className={`space-y-1.5 ${field.type === 'radio' ? 'md:col-span-2' : (field.name === 'gender' || field.name === 'age' ? 'md:col-span-1' : '')}`}>
                                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-1">
                                            {field.label}
                                        </label>
                                        {renderInput(field)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold shadow-lg shadow-green-900/20 transform hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group text-sm"
                        >
                            {status === 'submitting' ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <SendIcon className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    Submit Application
                                </>
                            )}
                        </button>
                    </div>

                    {status === 'error' && (
                        <p className="text-center text-red-500 text-xs font-medium">Something went wrong. Please check your connection.</p>
                    )}
                </form>
            </div>
        </div>
    );
}
