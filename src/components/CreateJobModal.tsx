import React, { useEffect, useReducer } from 'react';
import Modal from './Modal';
import type { Job, Status } from '../types/kanban';
import { useKanban } from '../context/KanbanContext';

interface JobModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobToEdit?: Job | null; // If provided -> EDIT mode. If null/undefined -> CREATE mode.
}
// 1. Form state shape
type JobFormState = Omit<Job, 'id' | 'boardId' | 'appliedDate'>;


// 2. Initial blank form values
const initialFormState: JobFormState = {
    title: '',
    company: '',
    status: 'Applied',
    priority: 'Medium',
    location: '',
    salary: '',
};

type FormAction =
    | { type: 'UPDATE_FIELD'; field: keyof JobFormState; value: string }
    | { type: 'SET_FORM'; payload: JobFormState }
    | { type: 'RESET' };
function jobFormReducer(state: JobFormState, action: FormAction): JobFormState {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_FORM':
            return action.payload;
        case 'RESET':
            return initialFormState;
        default:
            return state;
    }
}



export default function CreateJobModal({
    isOpen,
    onClose, jobToEdit
}: JobModalProps) {
    const [formData, dispatch] = useReducer(jobFormReducer, initialFormState);
    const { selectedBoardId, updateJob, addJob } = useKanban();

    useEffect(() => {
        if (jobToEdit) {
            // Pre-fill form with existing job details
            dispatch({
                type: 'SET_FORM',
                payload: {
                    title: jobToEdit.title,
                    company: jobToEdit.company,
                    status: jobToEdit.status,
                    priority: jobToEdit.priority,
                    location: jobToEdit.location || '',
                    salary: jobToEdit.salary || '',
                },
            });
        } else {
            dispatch({ type: 'RESET' });
        }
    }, [jobToEdit, isOpen]);



    // Helper to update any field cleanly
    const handleChange = (
        field: keyof JobFormState,
        value: string
    ) => {
        dispatch({ type: 'UPDATE_FIELD', field, value });
    };

    const handleClose = () => {
        dispatch({ type: 'RESET' }); // Clear fields when closing
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.company.trim()) return;

        if (jobToEdit) {
            // EDIT
            updateJob({
                ...jobToEdit,
                ...formData,
            });
        } else {
            // CREATE: generate new id and date
            addJob({
                id: `job-${Date.now()}`,
                boardId: selectedBoardId,
                ...formData,
                appliedDate: new Date().toISOString().split('T')[0],
            });
        }

        handleClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={jobToEdit ? 'Edit Job' : 'Add New Job'}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Job Title */}
                <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">
                        Job Title *
                    </label>
                    <input
                        autoFocus
                        required
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g. Frontend Engineer (React)"
                        className="w-full px-3.5 py-2.5 text-sm text-neutral-800 border border-neutral-200 rounded-xl outline-none focus:border-[#637ecb] focus:ring-2 focus:ring-[#637ecb]/15"
                    />
                </div>

                {/* Company Name */}
                <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">
                        Company *
                    </label>
                    <input
                        required
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder="e.g. Google, Stripe"
                        className="w-full px-3.5 py-2.5 text-sm text-neutral-800 border border-neutral-200 rounded-xl outline-none focus:border-[#637ecb] focus:ring-2 focus:ring-[#637ecb]/15"
                    />
                </div>

                {/* Status & Priority row */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleChange('status', e.target.value as Status)}
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
                            value={formData.priority}
                            onChange={(e) => handleChange('priority', e.target.value as 'High' | 'Medium' | 'Low')}
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
                            value={formData.location}
                            onChange={(e) => handleChange('location', e.target.value)}
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
                            value={formData.salary}
                            onChange={(e) => handleChange('salary', e.target.value)}
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
                        disabled={!formData.title.trim() || !formData.company.trim()}
                        className="py-2.5 px-4 bg-[#637ecb] hover:bg-[#526cba] disabled:bg-[#637ecb]/50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                        {jobToEdit ? 'Save Changes' : 'Create Job'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
