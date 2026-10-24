import type { SignupValues } from '@/logic/auth/submit/submit'
import type { SignupField } from '@/logic/auth/validation/validation'

export function getVisibleSignupErrors(_values: SignupValues, _hasSubmitted: boolean): SignupField[] {
  return ['email']
}
