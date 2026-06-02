import React, { createContext, useEffect, useState } from 'react'
import { User as FirebaseUser } from 'firebase/auth'
import { authService } from '@/services/authService'

interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
  error: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}
