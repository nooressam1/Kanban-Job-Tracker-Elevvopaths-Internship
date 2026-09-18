import Navbar from '../components/Navbar';
import BoardSection from '../components/BoardSection';
import KanbanSkeleton from '../components/KanbanSkeleton';
import { useKanban } from '../context/KanbanContext';

export default function KanBanPage() {
    const { activeBoard, currentBoardJobs, isLoading } = useKanban();

    return (
        <div className="w-full h-full bg-[#F5F5F5] flex flex-row">
            <Navbar />
            {isLoading ? (
                <KanbanSkeleton />
            ) : !activeBoard ? (
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

