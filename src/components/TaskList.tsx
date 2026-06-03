import { Task } from '@/types/index'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, loading }) => {
  if (loading) {
    return (
      <div className="loading-tasks">
        <div className="spinner-small"></div>
        <p>Cargando tareas...</p>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-tasks">
        <p>No hay tareas aún</p>
        <p className="hint">Crea una nueva tarea para comenzar</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
