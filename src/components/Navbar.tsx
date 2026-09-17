import { useState } from 'react';
import SidebarToggleButton from './SidebarToggleButton';
import NavButton from './NavButtons';
import CreateBoardButton from './CreateBoardButton';
import type { Board } from '../types/kanban';
import { useKanban } from '../context/KanbanContext';
import CreateBoardModal from './CreateBoardModal';



export default function Navbar() {
    const { boards, selectedBoardId, setSelectedBoardId, createBoard } = useKanban();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);


    return (
        <>
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-30 p-2.5 bg-white border border-neutral-200 rounded-xl shadow-md text-neutral-700 active:scale-95"
                aria-label="Open menu"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            {isMobileOpen && (
                <div
                    onClick={() => setIsMobileOpen(false)}
                    className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
                />
            )}
            <aside className={`
        /* Mobile: Fixed overlay drawer with slide transition */
        fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white h-screen flex flex-col justify-between shadow-2xl transition-transform duration-200 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        /* Desktop (md: and up): Normal sidebar layout */
        md:relative md:translate-x-0 md:shadow-none
        ${isCollapsed ? 'md:w-20' : 'md:w-64'}
    `}>
                <div className="flex flex-row items-center justify-between p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] ">
                    <div className={`${isCollapsed ? "max-w-0 opacity-0 "
                        : "max-w-[150px] opacity-100 "} overflow-hidden transition-all duration-120 ease-in-out flex items-center gap-3 whitespace-nowrap`}>
                        <div className="w-10 h-10"><img className="h-full w-full object-cover" src="/src/assets/Icon.png" alt="logo" /></div>
                        <h1 className="text-black text-lg font-semibold">Job Tracker</h1>
                    </div>
                    {!isMobileOpen && <div>
                        <SidebarToggleButton
                            isCollapsed={isCollapsed}
                            onClick={() => setIsCollapsed(!isCollapsed)} />
                    </div>}

                </div>
                <div className="p-5 flex-1 flex flex-col gap-3 overflow-y-auto">
                    <h1 className="text-[#858282] text-sm font-normal ">Boards</h1>
                    <nav className='flex flex-col gap-3 '>
                        {boards.map((board) => (
                            <NavButton
                                key={board.id}
                                label={board.name}
                                title={board.name}
                                isActive={selectedBoardId === board.id}
                                onClick={() => setSelectedBoardId(board.id)}
                                isCollapsed={isCollapsed}
                            />
                        ))}
                    </nav>

                </div>
                <div className="p-5 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <CreateBoardButton
                        isCollapsed={isCollapsed}
                        onClick={() => setIsCreateModalOpen(true)}
                    />
                </div>

            </aside > <CreateBoardModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            /></>
    );
}
