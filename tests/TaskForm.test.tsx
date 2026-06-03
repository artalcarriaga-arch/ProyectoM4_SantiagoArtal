import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TaskForm } from '@/components/TaskForm'
import * as tasksService from '@/services/tasksService'
import { AuthContext } from '@/features/auth/AuthContext'

vi.mock('@/services/tasksService')

const mockUser = {
  uid: 'test-user-id',
  email: 'test@example.com',
}

describe('TaskForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza el formulario correctamente', () => {
    render(
      <AuthContext.Provider value={{ user: mockUser, loading: false, error: null }}>
        <TaskForm />
      </AuthContext.Provider>
    )

    expect(screen.getByText('Nueva tarea')).toBeInTheDocument()
    expect(screen.getByLabelText('Título')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Crear tarea/i })).toBeInTheDocument()
  })

  it('muestra error si el título está vacío', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser, loading: false, error: null }}>
        <TaskForm />
      </AuthContext.Provider>
    )

    const submitButton = screen.getByRole('button', { name: /Crear tarea/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('El título es obligatorio')).toBeInTheDocument()
    })
  })

  it('llama a createTask cuando se envía el formulario válido', async () => {
    vi.mocked(tasksService.tasksService.createTask).mockResolvedValueOnce('task-id')

    render(
      <AuthContext.Provider value={{ user: mockUser, loading: false, error: null }}>
        <TaskForm />
      </AuthContext.Provider>
    )

    const titleInput = screen.getByLabelText('Título')
    const descriptionInput = screen.getByLabelText('Descripción')
    const submitButton = screen.getByRole('button', { name: /Crear tarea/i })

    fireEvent.change(titleInput, { target: { value: 'Mi tarea' } })
    fireEvent.change(descriptionInput, { target: { value: 'Descripción' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(tasksService.tasksService.createTask).toHaveBeenCalledWith(
        'test-user-id',
        { title: 'Mi tarea', description: 'Descripción' }
      )
    })
  })

  it('limpia el formulario después de crear una tarea', async () => {
    vi.mocked(tasksService.tasksService.createTask).mockResolvedValueOnce('task-id')

    render(
      <AuthContext.Provider value={{ user: mockUser, loading: false, error: null }}>
        <TaskForm />
      </AuthContext.Provider>
    )

    const titleInput = screen.getByLabelText('Título') as HTMLInputElement
    const descriptionInput = screen.getByLabelText('Descripción') as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: /Crear tarea/i })

    fireEvent.change(titleInput, { target: { value: 'Mi tarea' } })
    fireEvent.change(descriptionInput, { target: { value: 'Descripción' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(titleInput.value).toBe('')
      expect(descriptionInput.value).toBe('')
    })
  })
})
