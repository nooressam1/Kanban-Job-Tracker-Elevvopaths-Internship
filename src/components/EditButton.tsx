import React from 'react';
import { PenLine } from 'lucide-react';

interface EditButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
}

export default function EditButton({
    size = 'md',
    className = '',
    onClick,
    ...props
}: EditButtonProps) {
    // Sizing variants
    const sizeClasses = {
        sm: 'w-7 h-7',
        md: 'w-9 h-9',
        lg: 'w-10 h-10',
    }[size];

    const iconSizes = {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    }[size];

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="Edit"
            title="Edit"
            className={`inline-flex items-center justify-center rounded-full bg-white border border-neutral-100 shadow-md shadow-neutral-200/60 hover:bg-neutral-50 hover:shadow-lg active:scale-95 transition-all duration-150 cursor-pointer ${sizeClasses} ${className}`}
            {...props}
        >
            <PenLine className={`${iconSizes} text-neutral-500`} strokeWidth={2} />
        </button>
    );
}
