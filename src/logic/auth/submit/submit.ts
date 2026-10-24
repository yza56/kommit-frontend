export type SigninValues = { email: string; password: string }
export type SignupValues = { name: string; email: string; password: string }

export function isSigninSubmitDisabled(_values: SigninValues, _isPending: boolean): boolean {
  return false
}

export function isSignupSubmitDisabled(_values: SignupValues, _isPending: boolean): boolean {
  return false
}
