import type { ApiError, AuthErrorCode } from '@/types/apiContract'

export type AuthErrorDisplay = { target: 'email' | 'form'; message: string }

const ERRORS_BY_CODE: Record<AuthErrorCode, AuthErrorDisplay> = {
  EMAIL_ALREADY_EXISTS: { target: 'email', message: 'Un compte avec cet email existe déjà' },
  INVALID_CREDENTIALS: { target: 'form', message: 'Email ou mot de passe incorrect' },
}

export function authErrorFor(code: AuthErrorCode): AuthErrorDisplay {
  return ERRORS_BY_CODE[code]
}

const isAuthErrorCode = (code: ApiError['code']): code is AuthErrorCode => code in ERRORS_BY_CODE

export function displayApiError(apiError: ApiError): AuthErrorDisplay {
  return isAuthErrorCode(apiError.code)
    ? authErrorFor(apiError.code)
    : { target: 'form', message: apiError.message }
}
