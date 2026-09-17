import { useDroppable } from '@dnd-kit/core';
import type { Job, Status } from '../types/kanban';
import JobCard from './JobCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ColumnProps {
    columnTitle: Status;
    columnColor: string;
    jobData: Job[];
}

export default function Column({ columnTitle, columnColor, jobData, }: ColumnProps) {
    const filteredJobs = jobData.filter((job) => job.status === columnTitle);
    const { setNodeRef, isOver } = useDroppable({
        id: columnTitle,
    });
    return (
        <section ref={setNodeRef} style={{ borderTopColor: columnColor }}
            className={`max-h-full shrink-0 py-4 px-4 border-t-7 rounded-md w-[320px] bg-[#FDFDFD] h-full flex flex-col gap-3 transition-colors ${isOver ? 'bg-blue-50/50' : ''}`}>
            <h1 className="text-black flex  text-md font-semibold">{columnTitle}</h1>
            <SortableContext
                items={filteredJobs.map((job) => job.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-3 overflow-y-auto flex-1 min-h-[100px]">
                    {filteredJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                    {filteredJobs.length === 0 && (
                        <div className="border-2 border-dashed border-neutral-200 rounded-lg h-24 flex items-center justify-center text-xs text-neutral-400">
                            Drop job here
                        </div>
                    )}
                </div>
            </SortableContext>
        </section >
    );
}
