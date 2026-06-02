import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/authService'
import { useNavigate } from 'react-router-dom'

export const Header: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authService.logout()
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1>Task Manager</h1>
        <div className="user-section">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
