import { z } from 'zod'

import type { SigninValues, SignupValues } from '@/logic/auth/submit/submit'

export type SignupField = 'name' | 'email' | 'password'

const SIGNUP_FIELDS: SignupField[] = ['name', 'email', 'password']
const MIN_PASSWORD_LENGTH = 8

const signupSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().pipe(z.email()),
  password: z.string().min(MIN_PASSWORD_LENGTH),
})

export function getInvalidSignupFields(values: SignupValues): SignupField[] {
  const issues = signupSchema.safeParse(values).error?.issues ?? []
  const invalidFields = new Set(issues.map((issue) => issue.path[0]))

  return SIGNUP_FIELDS.filter((field) => invalidFields.has(field))
}

export function getInvalidSigninFields(_values: SigninValues): SignupField[] {
  return []
}
