export type ArrivalOrigin = 'signup' | 'signin'

export function composeArrivalToast(origin: ArrivalOrigin, name: string): string {
  return origin === 'signup' ? `Bienvenue ${name}, ton compte est créé.` : `Content de te revoir ${name}.`
}
