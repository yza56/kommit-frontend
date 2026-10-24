import type { SigninValues, SignupValues } from '@/logic/auth/submit/submit'

export type SignupField = 'name' | 'email' | 'password'

export function getInvalidSignupFields(_values: SignupValues): SignupField[] {
  return []
}

export function getInvalidSigninFields(_values: SigninValues): SignupField[] {
  return ['email']
}
