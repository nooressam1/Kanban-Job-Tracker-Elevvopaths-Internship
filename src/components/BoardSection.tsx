import { Plus } from 'lucide-react';
import type { Job, Status } from '../types/kanban';
import { COLUMNS } from '../data/mockData';
import Column from './columns';
import { useKanban } from '../context/KanbanContext';
import { closestCorners, DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import CreateJobModal from './CreateJobModal';
import { useState } from 'react';

interface BoardSectionProps {
    boardTitle: string;
    jobs: Job[];
    // Backward compatibility prop
    companieLabel?: string;
}

export default function BoardSection({
    boardTitle,
    jobs,
    companieLabel,
}: BoardSectionProps) {
    const title = boardTitle || companieLabel || 'Job Board';

    const { moveJob, isJobModalOpen, openCreateJobModal, closeJobModal, editingJob } = useKanban();
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );
    // 2. Handle dropping the card
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;
        const activeJobId = String(active.id);
        const overId = String(over.id);
        // Case A: Dropped directly over a Column (overId is the column name)
        const isColumn = COLUMNS.some((col) => col.id === overId);
        if (isColumn) {
            moveJob(activeJobId, overId as Status);
            return;
        }
        // Case B: Dropped over another JobCard (find that job's column)
        const targetJob = jobs.find((j) => j.id === overId);
        if (targetJob) {
            moveJob(activeJobId, targetJob.status);
        }
    };
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <main className="flex-1  h-screen flex flex-col gap-6 overflow-x-auto  bg-[#F1F5F9]">
                {/* Header: Board Title & Add Job Action */}
                <div className="flex p-6 items-center justify-between">
                    <div>
                        <h1 className="text-neutral-900 text-2xl font-bold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-xs text-neutral-500 mt-0.5">
                            Track and manage your job applications across stages
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => openCreateJobModal()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#4E69B3] hover:bg-[#3E5596] text-white text-sm font-medium rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Job</span>
                    </button>
                </div>

                {/* Kanban Columns (4 Stages) */}
                <div className="flex-1 flex flex-row w-full px-5 overflow-y-auto  gap-3 h-full min-h-0">
                    {COLUMNS.map((column) => (
                        <Column
                            key={column.id}
                            columnTitle={column.id}
                            columnColor={column.accentColor}
                            jobData={jobs}

                        />
                    ))}
                </div>
                <CreateJobModal isOpen={isJobModalOpen} onClose={() => closeJobModal()} jobToEdit={editingJob} />
            </main></DndContext>
    );
}
