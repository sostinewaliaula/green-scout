import React, { createContext, useContext, useState, ReactNode } from 'react';
import { JoinModal } from '../components/JoinModal';

interface JoinModalContextType {
    openJoinModal: () => void;
    closeJoinModal: () => void;
}

const JoinModalContext = createContext<JoinModalContextType | undefined>(undefined);

export function JoinModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openJoinModal = () => setIsOpen(true);
    const closeJoinModal = () => setIsOpen(false);

    return (
        <JoinModalContext.Provider value={{ openJoinModal, closeJoinModal }}>
            {children}
            <JoinModal isOpen={isOpen} onClose={closeJoinModal} />
        </JoinModalContext.Provider>
    );
}

export function useJoinModal() {
    const context = useContext(JoinModalContext);
    if (context === undefined) {
        throw new Error('useJoinModal must be used within a JoinModalProvider');
    }
    return context;
}
