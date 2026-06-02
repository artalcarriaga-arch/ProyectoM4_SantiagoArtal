import { Header } from '@/components/Header'

export const TasksPage: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="tasks-main">
        <div className="tasks-container">
          <h2>Mis Tareas</h2>
          <p className="placeholder">Hito 6: CRUD de tareas (próximamente)</p>
        </div>
      </main>
    </div>
  )
}
