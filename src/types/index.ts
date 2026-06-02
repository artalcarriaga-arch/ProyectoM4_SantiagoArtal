export interface User {
  uid: string
  email: string
  displayName?: string
}

export interface Task {
  id: string
  userId: string
  title: string
  description: string
  completed: boolean
  createdAt: number
  updatedAt: number
  dueDate?: number
}

export interface TaskInput {
  title: string
  description: string
  dueDate?: number
}
