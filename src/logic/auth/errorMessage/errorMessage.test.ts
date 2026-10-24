import { describe, expect, it } from 'vitest'

import { authErrorFor } from '@/logic/auth/errorMessage/errorMessage'

describe("authErrorFor — RM9 / RM13 message choisi d'après le code de l'ApiError", () => {
  it("RM9 : EMAIL_ALREADY_EXISTS s'affiche sous le champ Email avec le message du contrat", () => {
    expect(authErrorFor('EMAIL_ALREADY_EXISTS')).toEqual({
      target: 'email',
      message: 'Un compte avec cet email existe déjà',
    })
  })

  it("RM13 : INVALID_CREDENTIALS s'affiche en erreur de formulaire, pas sous un champ précis", () => {
    const errorForBadCredentials = authErrorFor('INVALID_CREDENTIALS')

    expect(errorForBadCredentials.target).toBe('form')
  })

  it("RM13 : INVALID_CREDENTIALS a un message non vide, distinct de celui de l'email déjà pris", () => {
    const errorForBadCredentials = authErrorFor('INVALID_CREDENTIALS')
    const errorForExistingEmail = authErrorFor('EMAIL_ALREADY_EXISTS')

    expect(errorForBadCredentials.message).not.toBe('')
    expect(errorForBadCredentials.message).not.toBe(errorForExistingEmail.message)
  })
})
