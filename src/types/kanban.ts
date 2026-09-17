export type Status = 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';

// Kept for backward compatibility
export type StageStatus = Status;

export interface Board {
  id: string;
  name: string;        // e.g. "Summer 2026 Internships", "Full-Time Roles"
  createdAt: string;
}

// Alias for compatibility
export type Company = Board;

export interface Job {
  id: string;
  boardId: string;
  title: string;       // e.g. "Frontend Engineer (React)"
  company: string;     // e.g. "Google", "Stripe"
  status: Status;      // 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
  priority: 'High' | 'Medium' | 'Low';
  salary?: string;     // e.g. "$140k - $160k", "$45/hr"
  location?: string;   // e.g. "Remote", "Mountain View, CA"
  appliedDate: string; // e.g. "2026-03-02"
}

export interface Column {
  id: Status;
  title: Status;
  accentColor: string;
}
