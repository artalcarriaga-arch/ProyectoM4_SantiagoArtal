import { Header } from '@/components/Header'
import { TaskForm } from '@/components/TaskForm'
import { TaskList } from '@/components/TaskList'
import { SendEmailButton } from '@/components/SendEmailButton'
import { useAuth } from '@/hooks/useAuth'
import { useTasks } from '@/hooks/useTasks'

export const TasksPage: React.FC = () => {
  const { user } = useAuth()
  const { tasks, loading } = useTasks(user?.uid)

  return (
    <div>
      <Header />
      <main className="tasks-main">
        <div className="tasks-container">
          <div className="tasks-grid">
            <TaskForm />
            <div className="task-list-section">
              <div className="task-list-header">
                <h2>Mis Tareas ({tasks.length})</h2>
                <SendEmailButton tasks={tasks} />
              </div>
              <TaskList tasks={tasks} loading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
