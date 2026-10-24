import { describe, expect, it } from 'vitest'

import { getVisibleSignupErrors } from '@/logic/auth/errorDisplay/errorDisplay'

describe('getVisibleSignupErrors — RM30 erreurs de format au signup', () => {
  const invalidValues = { name: 'Marc', email: 'marc@x.com', password: '123' }

  it("n'affiche aucune erreur avant la 1re soumission, même avec des valeurs invalides", () => {
    expect(getVisibleSignupErrors(invalidValues, false)).toEqual([])
  })

  it('affiche les erreurs de format dès la 1re soumission', () => {
    expect(getVisibleSignupErrors(invalidValues, true)).toEqual(['password'])
  })

  it("retire l'erreur quand la saisie est corrigée après la soumission", () => {
    const correctedValues = { ...invalidValues, password: '12345678' }

    expect(getVisibleSignupErrors(correctedValues, true)).toEqual([])
  })

  it('fait apparaître une erreur quand un champ redevient invalide après la soumission', () => {
    const brokenEmailValues = { name: 'Marc', email: 'marc', password: '12345678' }

    expect(getVisibleSignupErrors(brokenEmailValues, true)).toEqual(['email'])
  })

  it('affiche plusieurs erreurs à la fois', () => {
    const allInvalidValues = { name: '  ', email: 'x', password: 'abc' }

    expect(getVisibleSignupErrors(allInvalidValues, true)).toEqual(['name', 'email', 'password'])
  })
})
