import { useAuth } from '@/hooks/useAuth'
import { tasksService } from '@/services/tasksService'
import { useTaskForm } from '@/hooks/useTaskForm'

export const TaskForm: React.FC = () => {
  const { user } = useAuth()

  const handleCreateTask = async (data: any) => {
    if (!user) return
    await tasksService.createTask(user.uid, data)
  }

  const { title, setTitle, description, setDescription, loading, error, handleSubmit } =
    useTaskForm({ onSubmit: handleCreateTask })

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <h3>Nueva tarea</h3>

        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Comprar leche"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Ir al supermercado cerca de casa"
            disabled={loading}
            rows={4}
          />
        </div>

        <button type="submit" disabled={loading} className="btn-create">
          {loading ? 'Guardando...' : 'Crear tarea'}
        </button>
      </form>
    </div>
  )
}
