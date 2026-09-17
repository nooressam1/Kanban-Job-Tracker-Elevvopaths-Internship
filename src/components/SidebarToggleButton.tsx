import React from 'react';

interface SidebarToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isCollapsed?: boolean;
}

export const SidebarToggleIcon: React.FC<{ isCollapsed?: boolean; className?: string }> = ({
  isCollapsed = false,
  className = "w-6 h-6 text-neutral-700",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""
        }`}
    >
      {/* Outer rounded rectangle */}
      <rect
        x="3"
        y="4.5"
        width="18"
        height="15"
        rx="3.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vertical sidebar divider */}
      <line
        x1="9.5"
        y1="4.5"
        x2="9.5"
        y2="19.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Left chevron arrow */}
      <path
        d="M7.75 9.75L5.5 12L7.75 14.25"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function SidebarToggleButton({
  isCollapsed = false,
  className = "",
  onClick,
  ...props
}: SidebarToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={`relative inline-flex items-center justify-center 
        w-10 h-10 bg-white rounded-md border border-neutral-100 shadow-sm hover:bg-neutral-50  active:scale-95  transition-all duration-200 cursor-pointer  ${className}`}
      {...props}
    >
      <SidebarToggleIcon isCollapsed={isCollapsed} />
    </button>
  );
}
