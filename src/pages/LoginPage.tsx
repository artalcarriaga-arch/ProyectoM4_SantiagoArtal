import { useAuthForms } from '@/hooks/useAuthForms'

export const LoginPage: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLoginWithEmail,
    handleLoginWithGoogle,
  } = useAuthForms()

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLoginWithEmail}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="divider">o</div>

        <button
          onClick={handleLoginWithGoogle}
          disabled={loading}
          className="btn-google"
        >
          {loading ? 'Cargando...' : 'Continuar con Google'}
        </button>

        <p className="auth-link">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  )
}
