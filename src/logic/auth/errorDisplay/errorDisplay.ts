import type { SignupValues } from '@/logic/auth/submit/submit'
import { getInvalidSignupFields, type SignupField } from '@/logic/auth/validation/validation'

export function getVisibleSignupErrors(values: SignupValues, hasSubmitted: boolean): SignupField[] {
  return hasSubmitted ? getInvalidSignupFields(values) : []
}
