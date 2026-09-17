import React from 'react';
import { CirclePlus } from 'lucide-react';

interface CreateBoardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isCollapsed?: boolean;
}

export default function CreateBoardButton({
  label = "Create New Board",
  className = "",
  isCollapsed,
  onClick,
  ...props
}: CreateBoardButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2.5 ${isCollapsed ? "px-0" : "px-4"} py-3 bg-white rounded-lg border border-neutral-200 text-neutral-800 font-medium text-sm hover:bg-neutral-50 hover:border-neutral-300 active:scale-[0.99] transition-all duration-150 cursor-pointer shadow-xs ${className}`}
      {...props}
    >
      <CirclePlus className={`w-5 h-5 text-neutral-800`} strokeWidth={2} />
      {!isCollapsed && <span>{label}</span>}
    </button>
  );
}
