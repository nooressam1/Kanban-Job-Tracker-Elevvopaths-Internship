// src/components/CreateBoardModal.tsx
import Modal from './Modal';
import { useKanban } from '../context/KanbanContext';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface FormInputs {
    name: string;
}

export default function CreateBoardModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { createBoard } = useKanban();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        if (!data.name.trim()) return;
        createBoard(data.name.trim());
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="New Board">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <input
                    autoFocus
                    type="text"
                    {...register('name', { required: 'Board Name is required' })} placeholder="New Board Name"
                    className="w-full px-4 py-3 text-neutral-800 border border-neutral-200 rounded-xl outline-none focus:border-[#637ecb] focus:ring-3 focus:ring-[#637ecb]/15"
                />

                {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
                <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-3 px-4 bg-[#EBECEF] hover:bg-[#E0E2E7] text-neutral-700 font-medium text-sm rounded-xl cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-3 px-4 bg-[#637ecb] hover:bg-[#526cba] disabled:bg-[#637ecb]/50 text-white font-medium text-sm rounded-xl cursor-pointer"
                    >
                        Create New Board
                    </button>
                </div>
            </form>
        </Modal>
    );
}
