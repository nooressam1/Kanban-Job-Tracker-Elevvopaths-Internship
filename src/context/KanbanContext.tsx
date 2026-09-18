import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Board, Job, Status } from '../types/kanban';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface KanbanContextType {
    boards: Board[];
    selectedBoardId: string;
    activeBoard?: Board;
    setSelectedBoardId: (id: string) => void;
    createBoard: (name: string) => void;
    deleteBoard: (id: string) => void;
    moveJob: (id: string, newStatus: Status) => void;
    addJob: (job: Job) => void;
    deleteJob: (id: string) => void;
    updateJob: (job: Job) => void;
    openEditJobModal: (job: Job) => void;
    openCreateJobModal: () => void;
    closeJobModal: () => void;
    jobs: Job[];
    currentBoardJobs: Job[];
    isJobModalOpen: boolean;
    editingJob: Job | null;
    isLoading: boolean;
}

const DEFAULT_BOARD: Board[] = [
    {
        id: 'board-1',
        name: 'My Applications',
        createdAt: new Date().toISOString().split('T')[0],
    },
];

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export const KanbanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [boards, setBoards, isBoardsLoading] = useLocalStorage<Board[]>('kanban_board', DEFAULT_BOARD, 1000);
    const [jobs, setJobs, isJobsLoading] = useLocalStorage<Job[]>('kanban_jobs', [], 1000);
    const isLoading = isBoardsLoading || isJobsLoading;

    const [selectedBoardId, setSelectedBoardId] = useState<string>('');

    // Sync selected board once boards are loaded without infinite loops
    useEffect(() => {
        if (isLoading || boards.length === 0) return;

        const params = new URLSearchParams(window.location.search);
        const boardFromUrl = params.get('board');

        const targetBoard =
            (boardFromUrl && boards.find((b) => b.id === boardFromUrl)) ||
            boards.find((b) => b.id === selectedBoardId) ||
            boards[0];

        if (targetBoard && targetBoard.id !== selectedBoardId) {
            setSelectedBoardId(targetBoard.id);
        }
    }, [isLoading, boards]);

    const activeBoard = boards.find((b) => b.id === selectedBoardId) || boards[0];
    const currentBoardJobs = jobs.filter((job) => job.boardId === selectedBoardId);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);

    useEffect(() => {
        if (selectedBoardId) {
            const url = new URL(window.location.href);
            if (url.searchParams.get('board') !== selectedBoardId) {
                url.searchParams.set('board', selectedBoardId);
                window.history.replaceState({}, '', url.toString());
            }
        }
    }, [selectedBoardId]);

    const selectBoard = (id: string) => {
        setSelectedBoardId(id);
        const url = new URL(window.location.href);
        url.searchParams.set('board', id);
        window.history.pushState({}, '', url.toString());
    };

    const createBoard = (name: string) => {
        const newBoard: Board = {
            id: `board-${Date.now()}`,
            name,
            createdAt: new Date().toISOString().split('T')[0],
        };
        setBoards((prev) => [...prev, newBoard]);
        setSelectedBoardId(newBoard.id);
    };

    const deleteBoard = (id: string) => {
        setBoards((prev) => {
            const updated = prev.filter((b) => b.id !== id);
            if (selectedBoardId === id && updated.length > 0) {
                setSelectedBoardId(updated[0].id);
            }
            return updated;
        });
        setJobs((prev) => prev.filter((job) => job.boardId !== id));
    };

    const moveJob = (id: string, newStatus: Status) => {
        setJobs((prev) => {
            const updated = prev.map((job) =>
                job.id === id ? { ...job, status: newStatus } : job
            );
            return updated;
        });
    };

    const addJob = (newJob: Job) => {
        setJobs((prev) => [newJob, ...prev]);
    };

    const updateJob = (updateJobData: Job) => {
        setJobs((prev) => {
            const updatedList = prev.map((job) =>
                job.id === updateJobData.id ? updateJobData : job
            );
            return updatedList;
        });
    };

    const deleteJob = (id: string) => {
        setJobs((prev) => prev.filter((job) => job.id !== id));
    };

    const openCreateJobModal = () => {
        setEditingJob(null);
        setIsJobModalOpen(true);
    };

    const openEditJobModal = (job: Job) => {
        setEditingJob(job);
        setIsJobModalOpen(true);
    };

    const closeJobModal = () => {
        setIsJobModalOpen(false);
        setEditingJob(null);
    };

    return (
        <KanbanContext.Provider
            value={{
                boards,
                selectedBoardId,
                activeBoard,
                deleteJob,
                setSelectedBoardId: selectBoard,
                createBoard,
                openCreateJobModal,
                openEditJobModal,
                closeJobModal,
                isJobModalOpen,
                editingJob,
                deleteBoard,
                updateJob,
                moveJob,
                addJob,
                jobs,
                currentBoardJobs,
                isLoading,
            }}
        >
            {children}
        </KanbanContext.Provider>
    );
};

export const useKanban = (): KanbanContextType => {
    const context = useContext(KanbanContext);
    if (!context) {
        throw new Error('useKanban must be used within a KanbanProvider');
    }
    return context;
};
