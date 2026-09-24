import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import type { Job, Status } from '../types/kanban';
import { useKanban } from '../context/KanbanContext';

interface JobModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobToEdit?: Job | null; // If provided -> EDIT mode. If null/undefined -> CREATE mode.
}

interface JobFormInputs {
    title: string;
    company: string;
    status: Status;
    priority: 'High' | 'Medium' | 'Low';
    location?: string;
    salary?: string;
}

const defaultValues: JobFormInputs = {
    title: '',
    company: '',
    status: 'Applied',
    priority: 'Medium',
    location: '',
    salary: '',
};

export default function CreateJobModal({
    isOpen,
    onClose,
    jobToEdit,
}: JobModalProps) {
    const { selectedBoardId, updateJob, addJob } = useKanban();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<JobFormInputs>({
        defaultValues,
    });

    // Reset or pre-fill form when modal opens or jobToEdit changes
    useEffect(() => {
        if (jobToEdit) {
            reset({
                title: jobToEdit.title,
                company: jobToEdit.company,
                status: jobToEdit.status,
                priority: jobToEdit.priority,
                location: jobToEdit.location || '',
                salary: jobToEdit.salary || '',
            });
        } else {
            reset(defaultValues);
        }
    }, [jobToEdit, isOpen, reset]);

    const handleClose = () => {
        reset(defaultValues);
        onClose();
    };

    const onSubmit: SubmitHandler<JobFormInputs> = (data) => {
        if (jobToEdit) {

            updateJob({
                ...jobToEdit,
                ...data,
            });
        } else {
            addJob({
                id: `job-${Date.now()}`,
                boardId: selectedBoardId,
                ...data,
                appliedDate: new Date().toISOString().split('T')[0],
            });
        }

        handleClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={jobToEdit ? 'Edit Job' : 'Add New Job'}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Job Title */}
                <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">
                        Job Title *
                    </label>
                    <input
                        autoFocus
                        type="text"
                        {...register('title', {
                            required: 'Job title is required',
                            validate: (val) => val.trim().length > 0 || 'Job title cannot be empty',
                        })}
                        placeholder="e.g. Frontend Engineer (React)"
                        className="w-full px-3.5 py-2.5 text-sm text-neutral-800 border border-neutral-200 rounded-xl outline-none focus:border-[#637ecb] focus:ring-2 focus:ring-[#637ecb]/15"
                    />
                    {errors.title && (
                        <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Company Name */}
                <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">
                        Company *
                    </label>
                    <input
                        type="text"
                        {...register('company', {
                            required: 'Company name is required',
                            validate: (val) => val.trim().length > 0 || 'Company name cannot be empty',
                        })}
                        placeholder="e.g. Google, Stripe"
                        className="w-full px-3.5 py-2.5 text-sm text-neutral-800 border border-neutral-200 rounded-xl outline-none focus:border-[#637ecb] focus:ring-2 focus:ring-[#637ecb]/15"
                    />
                    {errors.company && (
                        <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>
                    )}
                </div>

                {/* Status & Priority row */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">
                            Status
                        </label>
                        <select
                            {...register('status')}
                            className="w-full px-3 py-2.5 text-sm bg-white text-neutral-800 border border-neutral-200 rounded-xl outline-none focus:border-[#637ecb]"
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">
                            Priority
                        </label>
                        <select
                            {...register('priority')}
                            className="w-full px-3 py-2.5 text-sm bg-white text-neutral-800 border border-neutral-200 rounded-xl outline-none focus:border-[#637ecb]"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>

                {/* Location & Salary row */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            {...register('location')}
                            placeholder="e.g. Remote, NY"
                            className="w-full px-3.5 py-2.5 text-sm text-neutral-800 border border-neutral-200 rounded-xl outline-none focus:border-[#637ecb]"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">
                            Salary
                        </label>
                        <input
                            type="text"
                            {...register('salary')}
                            placeholder="e.g. $120k - $140k"
                            className="w-full px-3.5 py-2.5 text-sm text-neutral-800 border border-neutral-200 rounded-xl outline-none focus:border-[#637ecb]"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-100">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="py-2.5 px-4 bg-[#EBECEF] hover:bg-[#E0E2E7] text-neutral-700 font-medium text-sm rounded-xl transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-2.5 px-4 bg-[#637ecb] hover:bg-[#526cba] disabled:bg-[#637ecb]/50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                        {jobToEdit ? 'Save Changes' : 'Create Job'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
