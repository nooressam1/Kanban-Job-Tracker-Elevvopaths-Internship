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



    return (
        <aside className={`${isCollapsed ? "w-20" : "w-1/4"} bg-white h-screen flex flex-col justify-between transition-all duration-200`}>
            <div className="flex flex-row items-center justify-between p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] ">
                <div className={`${isCollapsed ? "max-w-0 opacity-0 "
                    : "max-w-[150px] opacity-100 "} overflow-hidden transition-all duration-120 ease-in-out flex items-center gap-3 whitespace-nowrap`}>
                    <div className="w-10 h-10"><img className="h-full w-full object-cover" src="/src/assets/Icon.png" alt="logo" /></div>
                    <h1 className="text-black text-lg font-semibold">Job Tracker</h1>
                </div>
                <div>
                    <SidebarToggleButton
                        isCollapsed={isCollapsed}
                        onClick={() => setIsCollapsed(!isCollapsed)} />
                </div>
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
            <CreateBoardModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </aside>
    );
}
