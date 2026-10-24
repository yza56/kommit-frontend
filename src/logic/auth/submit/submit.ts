export type SigninValues = { email: string; password: string }
export type SignupValues = { name: string; email: string; password: string }

const isBlank = (value: string) => value.trim() === ''

export function isSigninSubmitDisabled(values: SigninValues, isPending: boolean): boolean {
  return isPending || isBlank(values.email) || isBlank(values.password)
}

export function isSignupSubmitDisabled(values: SignupValues, isPending: boolean): boolean {
  return isPending || isBlank(values.name) || isBlank(values.email) || isBlank(values.password)
}
