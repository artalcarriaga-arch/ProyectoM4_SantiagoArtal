import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskItem } from '@/components/TaskItem'
import { Task } from '@/types/index'
import * as tasksService from '@/services/tasksService'

vi.mock('@/services/tasksService')

const mockTask: Task = {
  id: 'task-1',
  userId: 'user-1',
  title: 'Comprar leche',
  description: 'Ir al supermercado',
  completed: false,
  createdAt: 1717369600000,
  updatedAt: 1717369600000,
}

describe('TaskItem', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza la tarea correctamente', () => {
    render(<TaskItem task={mockTask} />)

    expect(screen.getByText('Comprar leche')).toBeInTheDocument()
    expect(screen.getByText('Ir al supermercado')).toBeInTheDocument()
  })

  it('marca la tarea como completada cuando se hace click en el checkbox', async () => {
    vi.mocked(tasksService.tasksService.toggleCompleted).mockResolvedValueOnce()

    render(<TaskItem task={mockTask} />)

    const checkbox = screen.getByRole('button', { name: /Marcar como completada/i })
    fireEvent.click(checkbox)

    expect(tasksService.tasksService.toggleCompleted).toHaveBeenCalledWith('task-1', true)
  })

  it('muestra tachada si la tarea está completada', () => {
    const completedTask = { ...mockTask, completed: true }
    render(<TaskItem task={completedTask} />)

    const item = screen.getByText('Comprar leche').closest('.task-item')
    expect(item).toHaveClass('completed')
  })

  it('muestra confirmación antes de eliminar', () => {
    render(<TaskItem task={mockTask} />)

    const deleteButton = screen.getByRole('button', { name: '🗑' })
    fireEvent.click(deleteButton)

    expect(screen.getByText('¿Estás seguro?')).toBeInTheDocument()
  })

  it('elimina la tarea cuando se confirma', async () => {
    vi.mocked(tasksService.tasksService.deleteTask).mockResolvedValueOnce()

    render(<TaskItem task={mockTask} />)

    const deleteButton = screen.getByRole('button', { name: '🗑' })
    fireEvent.click(deleteButton)

    const confirmButton = screen.getByRole('button', { name: /Eliminar/ })
    fireEvent.click(confirmButton)

    expect(tasksService.tasksService.deleteTask).toHaveBeenCalledWith('task-1')
  })
})
