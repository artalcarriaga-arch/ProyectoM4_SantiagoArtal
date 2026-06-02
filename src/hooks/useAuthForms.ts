import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/authService'

export const useAuthForms = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    try {
      await authService.register(email, password)
      navigate('/tasks')
    } catch (err: any) {
      const errorMessage = mapFirebaseError(err.code)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginWithEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authService.loginWithEmail(email, password)
      navigate('/tasks')
    } catch (err: any) {
      const errorMessage = mapFirebaseError(err.code)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginWithGoogle = async () => {
    setError('')
    setLoading(true)

    try {
      await authService.loginWithGoogle()
      navigate('/tasks')
    } catch (err: any) {
      const errorMessage = mapFirebaseError(err.code)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    handleRegister,
    handleLoginWithEmail,
    handleLoginWithGoogle,
  }
}

const mapFirebaseError = (code: string): string => {
  const errorMap: Record<string, string> = {
    'auth/email-already-in-use': 'Este email ya está registrado',
    'auth/invalid-email': 'Email inválido',
    'auth/weak-password': 'La contraseña es muy débil',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/too-many-requests':
      'Demasiados intentos. Intenta más tarde',
    'auth/popup-closed-by-user':
      'Cancelaste el login con Google',
  }
  return errorMap[code] || 'Error de autenticación'
}
