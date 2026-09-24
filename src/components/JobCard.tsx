import { MapPin, DollarSign, Calendar, Building2 } from 'lucide-react';
import type { Job } from '../types/kanban';
import Badge from './Badge';
import EditButton from './EditButton';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useKanban } from '../context/KanbanContext';

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const badgeVariant = (job.priority ? job.priority.toLowerCase() : 'high') as 'high' | 'medium' | 'low';
    const { openEditJobModal } = useKanban();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: job.id, data: { job } })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    }
    return (
        <div ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners} className={`bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing flex flex-col justify-between gap-3 ${isDragging ? 'shadow-lg ring-2 ring-[#637ecb]/40 z-50' : ''
                }`}>
            {/* Top row: Priority badge + Edit button */}
            <div className="flex items-center justify-between">
                <Badge variant={badgeVariant} label={job.priority || 'High'} />
                <div onPointerDown={(e) => e.stopPropagation()}>
                    <EditButton size="sm" onClick={() => openEditJobModal(job)} />
                </div>            </div>

            {/* Position & Company */}
            <div className="flex flex-col gap-1">
                <h2 className="text-neutral-900 font-semibold text-base leading-snug">
                    {job.title}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{job.company}</span>
                </div>
            </div>

            {/* Location & Salary badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                {job.location && (
                    <span className="inline-flex items-center gap-1 bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100">
                        <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span>{job.location}</span>
                    </span>
                )}
                {job.salary && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50/70 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
                        <DollarSign className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{job.salary}</span>
                    </span>
                )}
            </div>

            {/* Footer: Applied Date */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span>Applied {job.appliedDate}</span>
                </div>
            </div>
        </div >
    );
}
