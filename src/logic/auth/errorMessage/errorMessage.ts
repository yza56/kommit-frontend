import type { AuthErrorCode } from '@/types/apiContract'

export type AuthErrorDisplay = { target: 'email' | 'form'; message: string }

export function authErrorFor(_code: AuthErrorCode): AuthErrorDisplay {
  return { target: 'email', message: '' }
}
