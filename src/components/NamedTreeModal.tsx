import React, { useEffect } from 'react';
import { XIcon, MapPinIcon, CalendarIcon, UserIcon, QuoteIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { PortableText } from '@portabletext/react';

type ImageAsset = { asset?: { url?: string } };

interface NamedTree {
    _id: string;
    treeName: string;
    namedAfter?: string;
    role?: string;
    treesPlanted?: number;
    county?: string;
    location?: string;
    scientificName?: string;
    plantedDate?: string;
    image?: ImageAsset | string;
    story?: any[] | string; // Block content or plain text
    description?: any[] | string; // Fallback field names
    fullDescription?: any[] | string;
    bio?: any[] | string;
}

interface NamedTreeModalProps {
    tree: NamedTree | null;
    isOpen: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    hasMore?: {
        next: boolean;
        prev: boolean;
    };
}

export function NamedTreeModal({ tree, isOpen, onClose, onNext, onPrev, hasMore }: NamedTreeModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' && onNext && hasMore?.next) onNext();
            if (e.key === 'ArrowLeft' && onPrev && hasMore?.prev) onPrev();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onNext, onPrev, hasMore, onClose]);

    if (!isOpen || !tree) return null;

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-gray-900 w-full max-w-4xl max-h-full overflow-y-auto rounded-3xl shadow-2xl transition-all animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
                >
                    <XIcon className="w-6 h-6" />
                </button>

                {/* Navigation Arrows */}
                {hasMore?.prev && onPrev && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-white/30 dark:hover:bg-black/50 transition-all transform hover:scale-110 active:scale-95 hidden md:block"
                        title="Previous Story"
                    >
                        <ChevronLeftIcon className="w-8 h-8" />
                    </button>
                )}

                {hasMore?.next && onNext && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-white/30 dark:hover:bg-black/50 transition-all transform hover:scale-110 active:scale-95 hidden md:block"
                        title="Next Story"
                    >
                        <ChevronRightIcon className="w-8 h-8" />
                    </button>
                )}

                <div className="relative">
                    {/* Top Section: Image and Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-100 dark:border-gray-800">
                        {/* Image Sidebar */}
                        <div className="h-72 md:h-auto min-h-[350px]">
                            {(() => {
                                const imageUrl = typeof tree.image === 'string' ? tree.image : tree.image?.asset?.url;
                                if (imageUrl) {
                                    return (
                                        <img
                                            src={imageUrl}
                                            alt={tree.treeName}
                                            className="w-full h-full object-cover"
                                        />
                                    );
                                }
                                return (
                                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-300 dark:from-green-900/40 dark:to-green-900/60 flex items-center justify-center">
                                        <span className="text-9xl">🌳</span>
                                    </div>
                                );
                            })()}

                            {/* Overlay Info for mobile */}
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent md:hidden">
                                <h2 className="text-3xl font-bold text-white mb-1">{tree.treeName}</h2>
                                {tree.namedAfter && (
                                    <p className="text-green-400 font-medium">In honor of {tree.namedAfter}</p>
                                )}
                            </div>
                        </div>

                        {/* Top Metadata Area */}
                        <div className="p-8 md:p-10 bg-gray-50/30 dark:bg-gray-900/30 flex flex-col justify-center">
                            <div className="hidden md:block mb-8">
                                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-1 leading-tight">
                                    {tree.treeName}
                                </h2>
                                {tree.scientificName && (
                                    <p className="text-lg text-gray-500 dark:text-gray-400 italic mb-2">
                                        {tree.scientificName}
                                    </p>
                                )}
                                {tree.namedAfter && (
                                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-lg">
                                        <QuoteIcon className="w-5 h-5" />
                                        <span>Dedicated to {tree.namedAfter}</span>
                                    </div>
                                )}
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                                        <MapPinIcon className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Location</span>
                                    </div>
                                    <div className="text-gray-900 dark:text-white font-semibold text-sm">{tree.location || tree.county || 'Green Scout Forest'}</div>
                                </div>

                                {tree.role && (
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                                            <UserIcon className="w-4 h-4" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Role</span>
                                        </div>
                                        <div className="text-gray-900 dark:text-white font-semibold text-sm truncate">{tree.role}</div>
                                    </div>
                                )}

                                {tree.treesPlanted !== undefined && (
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                                            <span className="text-lg">🌿</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Impact</span>
                                        </div>
                                        <div className="text-gray-900 dark:text-white font-semibold text-sm">
                                            {tree.treesPlanted} Trees Planted
                                        </div>
                                    </div>
                                )}

                                {tree.plantedDate && (
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm sm:col-span-2">
                                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Planted On</span>
                                        </div>
                                        <div className="text-gray-900 dark:text-white font-semibold text-sm">{formatDate(tree.plantedDate)}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Full Width Story */}
                    <div className="p-8 md:p-12">
                        <div className="prose prose-green dark:prose-invert max-w-none">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-10 h-1 bg-green-500 rounded-full"></span>
                                The Story
                            </h3>
                            {(() => {
                                const content = tree.story || tree.description || tree.fullDescription || tree.bio;

                                if (typeof content === 'string' && content.trim().length > 0) {
                                    return <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{content}</p>;
                                }

                                if (Array.isArray(content) && content.length > 0) {
                                    return <PortableText value={content} />;
                                }

                                return (
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic text-lg text-center py-10">
                                        The story for this tree is currently being written in our hearts. Join us on our next journey to learn more about this living tribute.
                                    </p>
                                );
                            })()}
                        </div>

                        {/* Call to Action & Mobile Nav */}
                        <div className="mt-12 pt-10 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                {/* Mobile Navigation Buttons */}
                                <div className="flex md:hidden gap-4 w-full sm:w-auto">
                                    {hasMore?.prev && (
                                        <button
                                            onClick={onPrev}
                                            className="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <ChevronLeftIcon className="w-5 h-5" />
                                            Prev
                                        </button>
                                    )}
                                    {hasMore?.next && (
                                        <button
                                            onClick={onNext}
                                            className="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Next
                                            <ChevronRightIcon className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-full sm:w-auto px-12 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold shadow-xl hover:shadow-green-900/40 transform hover:-translate-y-1 transition-all active:scale-95 text-lg"
                                >
                                    Close Story
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
