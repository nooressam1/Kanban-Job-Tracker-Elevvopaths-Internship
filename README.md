# 📋 Kanban Job Tracker Frontend 

A modern, responsive, full-featured **Kanban Board** built with **React**, **TypeScript**, and **Tailwind CSS** to track and organize job applications across different recruitment stages.

Developed as part of the **Elevvo Internship Program**.

---

## ✨ Features

- **Drag & Drop Kanban Workflow**: Move application cards seamlessly across 4 recruitment stages (**Applied**, **Interviewing**, **Offer**, **Rejected**) using `@dnd-kit`.
- **Multi-Board Management**: Create and switch between multiple job boards 
- **URL Query Syncing**: The active board ID is synced with the browser URL (`?board=...`), preserving your active view on refresh and shareable links.
- ** LocalStorage Persistence with Custom Hook**: Application data is automatically persisted in browser storage via a reusable `useLocalStorage` hook.
- ** Simulated Network Delay & Skeleton Loader**: Features an artificial 1-second latency simulation on initial load, rendering a shimmering, animated Skeleton Loader (`animate-pulse`) before rendering real data.
- ** Job Management (CRUD)**:
  - Add new job applications with title, company, salary, location, date, and priority level.
  - Edit existing job details via an interactive modal form.
  - Delete jobs or entire boards.
- **📱 Responsive Layout & Collapsible Sidebar**: Includes a desktop sidebar with collapse mode and a mobile slide-out overlay drawer.

---

##  Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Drag & Drop**: [@dnd-kit/core](https://dndkit.com/) & [@dnd-kit/sortable](https://dndkit.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)

---


##  Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Kanban-Job-Tracker-Elevvopaths-Internship.git
   cd Kanban-Job-Tracker-Elevvopaths-Internship
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```


## 📄 License
This project is developed for educational purposes as part of the **Elevvo Internship Program**.
