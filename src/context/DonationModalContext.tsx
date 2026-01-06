import { createContext, useContext, useState, ReactNode } from 'react';
import { DonationModal } from '../components/DonationModal';

interface DonationModalContextType {
    openDonationModal: () => void;
    closeDonationModal: () => void;
}

const DonationModalContext = createContext<DonationModalContextType | undefined>(undefined);

export function DonationModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openDonationModal = () => setIsOpen(true);
    const closeDonationModal = () => setIsOpen(false);

    return (
        <DonationModalContext.Provider value={{ openDonationModal, closeDonationModal }}>
            {children}
            <DonationModal isOpen={isOpen} onClose={closeDonationModal} />
        </DonationModalContext.Provider>
    );
}

export function useDonationModal() {
    const context = useContext(DonationModalContext);
    if (context === undefined) {
        throw new Error('useDonationModal must be used within a DonationModalProvider');
    }
    return context;
}
