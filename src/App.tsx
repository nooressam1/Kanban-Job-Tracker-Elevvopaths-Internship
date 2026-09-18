import './App.css'
import KanBanPage from './pages/KanBanPage'
import { KanbanProvider } from './context/KanbanContext';


function App() {

  return (
    <KanbanProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <KanBanPage />
      </div>
    </KanbanProvider>
  )
}

export default App
