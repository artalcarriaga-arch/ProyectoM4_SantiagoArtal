import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import { Task, TaskInput } from '@/types/index'

const TASKS_COLLECTION = 'tasks'

export const tasksService = {
  createTask: async (userId: string, taskInput: TaskInput): Promise<string> => {
    const now = Timestamp.now().toMillis()
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      userId,
      title: taskInput.title,
      description: taskInput.description,
      completed: false,
      dueDate: taskInput.dueDate || null,
      createdAt: now,
      updatedAt: now,
    })
    return docRef.id
  },

  getTasks: async (userId: string): Promise<Task[]> => {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[]
  },

  updateTask: async (
    taskId: string,
    updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>
  ): Promise<void> => {
    const taskRef = doc(db, TASKS_COLLECTION, taskId)
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: Timestamp.now().toMillis(),
    })
  },

  deleteTask: async (taskId: string): Promise<void> => {
    const taskRef = doc(db, TASKS_COLLECTION, taskId)
    await deleteDoc(taskRef)
  },

  toggleCompleted: async (taskId: string, completed: boolean): Promise<void> => {
    await tasksService.updateTask(taskId, { completed })
  },
}
