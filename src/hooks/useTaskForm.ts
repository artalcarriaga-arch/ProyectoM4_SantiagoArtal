import { useState } from 'react'
import { TaskInput } from '@/types/index'

interface UseTaskFormProps {
  onSubmit: (data: TaskInput) => Promise<void>
  initialData?: TaskInput
}

export const useTaskForm = ({ onSubmit, initialData }: UseTaskFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('El título es obligatorio')
      return
    }

    if (!description.trim()) {
      setError('La descripción es obligatoria')
      return
    }

    setLoading(true)
    try {
      await onSubmit({ title: title.trim(), description: description.trim() })
      setTitle('')
      setDescription('')
    } catch (err) {
      setError('Error al guardar la tarea')
    } finally {
      setLoading(false)
    }
  }

  return {
    title,
    setTitle,
    description,
    setDescription,
    loading,
    error,
    handleSubmit,
  }
}
