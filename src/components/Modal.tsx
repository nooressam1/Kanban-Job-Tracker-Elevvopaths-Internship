// src/components/Modal.tsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    // 1. Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 transition-opacity"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-7 flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                    <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-neutral-500 hover:text-neutral-800 p-1 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" strokeWidth={2.2} />
                    </button>
                </div>

                <div>{children}</div>
            </div>
        </div>
    );
}
