import { XIcon } from 'lucide-react';
import { JoinRegistrationForm } from './JoinRegistrationForm';

interface JoinModalProps {
    isOpen: boolean;
    onClose: () => void;
    formId?: string;
}

export function JoinModal({ isOpen, onClose, formId }: JoinModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full transition-colors"
                >
                    <XIcon className="w-5 h-5" />
                </button>

                {/* Form Content */}
                <div className="p-1">
                    <JoinRegistrationForm formId={formId} />
                </div>
            </div>
        </div>
    );
}
