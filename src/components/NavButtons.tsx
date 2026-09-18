interface NavButtonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
    isCollapsed?: boolean;
    label: string;
}

export default function NavButton({ isActive, label, onClick, isCollapsed, ...props }: NavButtonButtonProps) {
    const initial = label.charAt(0).toUpperCase();
    const restOfWord = label.slice(1);
    return (
        <button
            type="button"
            onClick={onClick}
            {...props}
            className={`w-full flex ${isCollapsed ? "px-2" : "px-4"} py-2.5 justify-start items-center transition-all duration-200 overflow-hidden rounded-md text-left text-sm font-medium ${isActive
                ? "bg-[#6B84C9]/7 text-white border-l-7 border-[#6B84C9] "         // Active styles
                : "bg-transparent text-gray-600 hover:bg-gray-100" // Inactive styles
                }`}>
            <span className={` ${isActive ? "text-[#4E69B3]" : "text-black"}  justify-center items-center text-md capitalize shrink-0  font-md `}>{initial}</span>
            <span className={` ${isActive ? "text-[#4E69B3]" : "text-black"} whitespace-nowrap ${isCollapsed ? "max-w-0 opacity-0"
                : "max-w-[150px] opacity-100"} overflow-hidden transition-all duration-200 ease-in-out text-md   font-md `}>{restOfWord}</span>
        </button>
    );
}
