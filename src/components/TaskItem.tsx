import { useState } from 'react'
import { Task } from '@/types/index'
import { tasksService } from '@/services/tasksService'

interface TaskItemProps {
  task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleToggleCompleted = async () => {
    setLoading(true)
    try {
      await tasksService.toggleCompleted(task.id, !task.completed)
    } catch (error) {
      console.error('Error al actualizar tarea:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await tasksService.deleteTask(task.id)
      setShowDeleteConfirm(false)
    } catch (error) {
      console.error('Error al eliminar tarea:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <button
          className="task-checkbox"
          onClick={handleToggleCompleted}
          disabled={loading}
          aria-label={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          {task.completed && <span>✓</span>}
        </button>

        <div className="task-text">
          <h4 className="task-title">{task.title}</h4>
          <p className="task-description">{task.description}</p>
          <span className="task-date">{formatDate(task.createdAt)}</span>
        </div>
      </div>

      <div className="task-actions">
        {showDeleteConfirm ? (
          <div className="delete-confirm">
            <span>¿Estás seguro?</span>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="btn-confirm-delete"
            >
              {loading ? '...' : 'Eliminar'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={loading}
              className="btn-cancel-delete"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={loading}
            className="btn-delete"
          >
            🗑
          </button>
        )}
      </div>
    </div>
  )
}
