import { useState } from 'react';
import Navbar from '../components/Navbar';
import BoardSection from '../components/BoardSection';
import { useKanban } from '../context/KanbanContext';

export default function KanBanPage() {
    const { activeBoard, currentBoardJobs } = useKanban();

    return (
        <div className='w-full h-full bg-[#F5F5F5] flex flex-row '>
            <Navbar />
            {!activeBoard ? (
                <div className="flex-1 flex items-center justify-center">
                    <h1 className="text-neutral-500 text-lg">No board selected</h1>
                </div>
            ) : (
                <BoardSection
                    boardTitle={activeBoard?.name || 'My Boards'}
                    jobs={currentBoardJobs}
                />
            )}
        </div>
    );
}
