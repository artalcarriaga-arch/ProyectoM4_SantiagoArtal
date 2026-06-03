import { Task } from '@/types/index'

interface SendEmailRequest {
  email: string
  tasks: Task[]
}

export const emailService = {
  sendTasksSummary: async ({ email, tasks }: SendEmailRequest): Promise<void> => {
    const tasksSummary = generateTasksSummary(tasks)

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        tasksSummary,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Error al enviar email')
    }

    return response.json()
  },
}

function generateTasksSummary(tasks: Task[]): string {
  const completed = tasks.filter((t) => t.completed).length
  const pending = tasks.filter((t) => !t.completed).length

  const tasksList = tasks
    .map((task) => {
      const status = task.completed ? '✓' : '○'
      return `<li>${status} <strong>${task.title}</strong> - ${task.description}</li>`
    })
    .join('')

  return `
    <p><strong>Total de tareas:</strong> ${tasks.length}</p>
    <p><strong>Completadas:</strong> ${completed} | <strong>Pendientes:</strong> ${pending}</p>
    <h3>Detalle de tareas:</h3>
    <ul>
      ${tasksList}
    </ul>
  `
}
