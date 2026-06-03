import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { emailService } from '@/services/emailService'
import { Task } from '@/types/index'

interface SendEmailButtonProps {
  tasks: Task[]
}

export const SendEmailButton: React.FC<SendEmailButtonProps> = ({ tasks }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSendEmail = async () => {
    if (!user?.email) return

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await emailService.sendTasksSummary({
        email: user.email,
        tasks,
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    } catch (err: any) {
      setError(err.message || 'Error al enviar email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="send-email-container">
      {success && (
        <div className="email-success">
          ✓ Email enviado correctamente a {user?.email}
        </div>
      )}

      {error && <div className="email-error">✗ {error}</div>}

      <button
        onClick={handleSendEmail}
        disabled={loading || tasks.length === 0}
        className="btn-send-email"
        title={tasks.length === 0 ? 'Crea tareas primero' : 'Enviar resumen por email'}
      >
        {loading ? '📧 Enviando...' : '📧 Enviar resumen'}
      </button>
    </div>
  )
}
