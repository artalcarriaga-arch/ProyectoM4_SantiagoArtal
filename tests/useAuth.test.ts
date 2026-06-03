import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import { AuthContext } from '@/features/auth/AuthContext'
import React from 'react'

describe('useAuth', () => {
  it('retorna el contexto de autenticación', () => {
    const mockAuthValue = {
      user: { uid: 'test-user', email: 'test@example.com' },
      loading: false,
      error: null,
    }

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(AuthContext.Provider, { value: mockAuthValue }, children)

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.user).toEqual({ uid: 'test-user', email: 'test@example.com' })
    expect(result.current.loading).toBe(false)
  })

  it('lanza error si se usa fuera de AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth debe usarse dentro de AuthProvider')
  })
})
