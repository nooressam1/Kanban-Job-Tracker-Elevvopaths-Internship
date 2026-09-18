import React from 'react';
import { COLUMNS } from '../data/mockData';

export const KanbanSkeleton: React.FC = () => {
    return (
        <main
            className="flex-1 h-screen flex flex-col gap-3 overflow-x-auto bg-[#F1F5F9]"
            aria-busy="true"
            aria-label="Loading Kanban board"
        >
            {/* Header Skeleton */}
            <div className="flex p-6 items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="h-7 w-48 bg-neutral-300/70 rounded-lg animate-pulse" />
                    <div className="h-3.5 w-28 bg-neutral-200 rounded-md animate-pulse" />
                </div>
                {/* Add Job Button Skeleton */}
                <div className="h-9 w-28 bg-neutral-300/80 rounded-lg animate-pulse" />
            </div>

            {/* Columns Skeleton */}
            <div className="flex-1 flex flex-row w-full px-5 overflow-y-auto gap-3 h-full min-h-0">
                {COLUMNS.map((column, colIdx) => (
                    <section
                        key={column.id}
                        style={{ borderTopColor: column.accentColor }}
                        className="max-h-full shrink-0 py-4 px-4 border-t-7 rounded-md w-[320px] bg-[#FDFDFD] h-full flex flex-col gap-3 shadow-xs"
                    >
                        {/* Column Title Skeleton */}
                        <div className="flex items-center justify-between pb-1">
                            <div className="h-5 w-24 bg-neutral-300/80 rounded animate-pulse" />
                            <div className="h-4 w-6 bg-neutral-200 rounded-full animate-pulse" />
                        </div>

                        {/* Cards Skeleton Container */}
                        <div className="flex flex-col gap-3 overflow-y-auto flex-1 min-h-[100px]">
                            {Array.from({ length: colIdx === 0 ? 3 : colIdx === 1 ? 2 : 1 }).map((_, cardIdx) => (
                                <div
                                    key={cardIdx}
                                    className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs flex flex-col gap-3 animate-pulse"
                                >
                                    {/* Priority badge & action */}
                                    <div className="flex items-center justify-between">
                                        <div className="h-4.5 w-14 bg-neutral-200 rounded-full" />
                                        <div className="h-5 w-5 bg-neutral-200/70 rounded-md" />
                                    </div>

                                    {/* Position & Company */}
                                    <div className="flex flex-col gap-1.5">
                                        <div className="h-4.5 w-3/4 bg-neutral-300/70 rounded" />
                                        <div className="h-3.5 w-1/2 bg-neutral-200 rounded" />
                                    </div>

                                    {/* Location & Salary badges */}
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-20 bg-neutral-100 border border-neutral-200/50 rounded-md" />
                                        <div className="h-5 w-16 bg-neutral-100 border border-neutral-200/50 rounded-md" />
                                    </div>

                                    {/* Footer: Applied Date */}
                                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                                        <div className="h-3 w-28 bg-neutral-200/80 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
};

export default KanbanSkeleton;
