import { useState, useEffect } from 'react'
import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { Task } from '@/types/index'

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', userId)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[]
        
        const sorted = tasksData.sort((a, b) => b.createdAt - a.createdAt)
        setTasks(sorted)
        setLoading(false)
      },
      () => {
        setError('Error al cargar tareas')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [userId])

  return { tasks, loading, error }
}
