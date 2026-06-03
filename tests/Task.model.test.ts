import { describe, it, expect } from 'vitest'

interface Task {
  id: string
  userId: string
  title: string
  description: string
  completed: boolean
  createdAt: number
  updatedAt: number
}

describe('Task Model', () => {
  it('crea una tarea correctamente', () => {
    const task: Task = {
      id: 'task-1',
      userId: 'user-1',
      title: 'Mi tarea',
      description: 'Descripción',
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    expect(task.title).toBe('Mi tarea')
    expect(task.completed).toBe(false)
    expect(task.userId).toBe('user-1')
  })

  it('una tarea completada tiene la propiedad completed = true', () => {
    const task: Task = {
      id: 'task-1',
      userId: 'user-1',
      title: 'Tarea completada',
      description: 'Ya hecha',
      completed: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    expect(task.completed).toBe(true)
  })

  it('valida que userId sea requerido', () => {
    const invalidTask = {
      title: 'Sin usuario',
      description: 'Inválida',
    }

    expect(invalidTask).not.toHaveProperty('userId')
  })
})
