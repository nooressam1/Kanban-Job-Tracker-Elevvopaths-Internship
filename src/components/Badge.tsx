import React from 'react';

export type BadgeVariant = 'high' | 'medium' | 'low' | 'blue';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    label?: string;
    variant?: BadgeVariant;
    children?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
    // Red (Matches your image: soft pink background, light red border, crimson text)
    high: 'bg-red-50 text-red-600 border-red-200',

    // Amber / Orange (Medium priority)
    medium: 'bg-amber-50 text-amber-600 border-amber-200',

    // Green (Low priority / Done)
    low: 'bg-emerald-50 text-emerald-600 border-emerald-200',

    // Blue (Info / In Progress)
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
};

export default function Badge({
    label,
    variant = 'high',
    children,
    className = '',
    ...props
}: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center justify-center px-3 py-0.5 text-xs font-medium rounded-full border transition-colors select-none ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {label || children}
        </span>
    );
}
