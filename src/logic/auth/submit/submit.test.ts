import { describe, expect, it } from 'vitest'

import { isSigninSubmitDisabled, isSignupSubmitDisabled } from '@/logic/auth/submit/submit'

describe('isSigninSubmitDisabled — RM32 / RM17', () => {
  it('RM32 : désactivé quand les deux champs sont vides', () => {
    const emptyValues = { email: '', password: '' }

    expect(isSigninSubmitDisabled(emptyValues, false)).toBe(true)
  })

  it("RM32 : désactivé quand seul l'email est rempli", () => {
    const valuesWithoutPassword = { email: 'marc@x.com', password: '' }

    expect(isSigninSubmitDisabled(valuesWithoutPassword, false)).toBe(true)
  })

  it('RM32 : désactivé quand seul le mot de passe est rempli', () => {
    const valuesWithoutEmail = { email: '', password: 'secret' }

    expect(isSigninSubmitDisabled(valuesWithoutEmail, false)).toBe(true)
  })

  it('RM32 : activé quand les deux champs sont remplis, sans vérifier le format', () => {
    const malformedButFilledValues = { email: 'pas-un-email', password: 'abc' }

    expect(isSigninSubmitDisabled(malformedButFilledValues, false)).toBe(false)
  })

  it("RM17 : désactivé pendant l'appel, même si les champs sont remplis", () => {
    const filledValues = { email: 'marc@x.com', password: 'secret' }

    expect(isSigninSubmitDisabled(filledValues, true)).toBe(true)
  })
})

describe('isSignupSubmitDisabled — RM33 / RM17', () => {
  const filledValues = { name: 'Marc', email: 'marc@x.com', password: 'motdepasse' }

  it('RM33 : désactivé quand les trois champs sont vides', () => {
    const emptyValues = { name: '', email: '', password: '' }

    expect(isSignupSubmitDisabled(emptyValues, false)).toBe(true)
  })

  it('RM33 : désactivé quand le prénom est vide', () => {
    expect(isSignupSubmitDisabled({ ...filledValues, name: '' }, false)).toBe(true)
  })

  it("RM33 : désactivé quand l'email est vide", () => {
    expect(isSignupSubmitDisabled({ ...filledValues, email: '' }, false)).toBe(true)
  })

  it('RM33 : désactivé quand le mot de passe est vide', () => {
    expect(isSignupSubmitDisabled({ ...filledValues, password: '' }, false)).toBe(true)
  })

  it("RM33 : un prénom composé uniquement d'espaces compte comme vide", () => {
    expect(isSignupSubmitDisabled({ ...filledValues, name: '   ' }, false)).toBe(true)
  })

  it("RM33 : un email composé uniquement d'espaces compte comme vide", () => {
    expect(isSignupSubmitDisabled({ ...filledValues, email: '   ' }, false)).toBe(true)
  })

  it("RM33 : un mot de passe composé uniquement d'espaces compte comme vide", () => {
    expect(isSignupSubmitDisabled({ ...filledValues, password: '        ' }, false)).toBe(true)
  })

  it("RM33 : activé quand l'email a des espaces autour mais un contenu", () => {
    expect(isSignupSubmitDisabled({ ...filledValues, email: '  marc@x.com  ' }, false)).toBe(false)
  })

  it('RM33 : activé quand les trois champs sont remplis', () => {
    expect(isSignupSubmitDisabled(filledValues, false)).toBe(false)
  })

  it('RM33 : activé même si le format est invalide, la validation se fait à la soumission', () => {
    const filledButInvalidValues = { name: 'Marc', email: 'pas-un-email', password: 'abc' }

    expect(isSignupSubmitDisabled(filledButInvalidValues, false)).toBe(false)
  })

  it("RM17 : désactivé pendant l'appel, même si les champs sont remplis", () => {
    expect(isSignupSubmitDisabled(filledValues, true)).toBe(true)
  })
})
