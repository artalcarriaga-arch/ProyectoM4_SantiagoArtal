import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import { AuthContext } from '@/features/auth/AuthContext'
import React from 'react'

describe('useAuth', () => {
  it('retorna el contexto de autenticación', () => {
    const mockUser = {
      uid: 'test-user',
      email: 'test@example.com',
      emailVerified: false,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      displayName: null,
      phoneNumber: null,
      photoURL: null,
      getIdToken: async () => '',
      getIdTokenResult: async () => ({ token: '' }),
      reload: async () => {},
      delete: async () => {},
      toJSON: () => ({}),
    } as any

    const mockAuthValue = {
      user: mockUser,
      loading: false,
      error: null,
    }

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(AuthContext.Provider, { value: mockAuthValue }, children)

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.loading).toBe(false)
  })

  it('lanza error si se usa fuera de AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth debe usarse dentro de AuthProvider')
  })
})
