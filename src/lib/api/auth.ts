import { requestWithSession } from '@/lib/api/client'
import type { Session } from '@/types/apiContract'

type SignupBody = { name: string; email: string; password: string }
type SigninBody = { email: string; password: string }

export const fetchSession = async (): Promise<Session> => {
  const response = await requestWithSession<Session>('/api/auth/get-session')

  return response && { user: response.user }
}

export const signUp = (body: SignupBody) => requestWithSession('/api/auth/sign-up/email', body)

export const signIn = (body: SigninBody) => requestWithSession('/api/auth/sign-in/email', body)

export const signOut = () => requestWithSession('/api/auth/sign-out', {})
