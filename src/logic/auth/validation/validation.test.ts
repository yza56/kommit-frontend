import { describe, expect, it } from 'vitest'

import { getInvalidSigninFields, getInvalidSignupFields } from '@/logic/auth/validation/validation'

describe('getInvalidSignupFields — RM10 / RM11 / RM20', () => {
  const validValues = { name: 'Marc', email: 'marc@x.com', password: '12345678' }

  it('ne signale rien quand les trois critères sont respectés', () => {
    expect(getInvalidSignupFields(validValues)).toEqual([])
  })

  it('RM10 : signale le prénom vide', () => {
    expect(getInvalidSignupFields({ ...validValues, name: '' })).toEqual(['name'])
  })

  it("RM10 : signale le prénom composé uniquement d'espaces (trimé)", () => {
    expect(getInvalidSignupFields({ ...validValues, name: '   ' })).toEqual(['name'])
  })

  it("RM10 : accepte un prénom entouré d'espaces", () => {
    expect(getInvalidSignupFields({ ...validValues, name: '  Marc  ' })).toEqual([])
  })

  it('RM11 : signale un email sans @', () => {
    expect(getInvalidSignupFields({ ...validValues, email: 'marc.x.com' })).toEqual(['email'])
  })

  it('RM11 : signale un email sans domaine après le @', () => {
    expect(getInvalidSignupFields({ ...validValues, email: 'marc@' })).toEqual(['email'])
  })

  it.each([
    ['des espaces dans l\'email', 'mar c@x.com'],
    ['un double @', 'marc@@x.com'],
    ['deux @ séparés', 'ma@rc@x.com'],
    ['un domaine sans point', 'marc@localhost'],
    ['une partie locale vide', '@x.com'],
    ['un point au début de la partie locale', '.marc@x.com'],
    ['deux points consécutifs dans la partie locale', 'ma..rc@x.com'],
    ['un domaine commençant par un point', 'marc@.x.com'],
    ['un domaine finissant par un point', 'marc@x.com.'],
    ['une extension d\'un seul caractère', 'marc@x.c'],
    ['des espaces seuls', '   '],
  ])('RM11 : signale un email avec %s', (_label, malformedEmail) => {
    expect(getInvalidSignupFields({ ...validValues, email: malformedEmail })).toEqual(['email'])
  })

  it.each([
    ['un sous-domaine', 'marc@mail.x.com'],
    ['un + dans la partie locale', 'marc+kommit@x.com'],
    ['un point dans la partie locale', 'jean.marc@x.com'],
    ['un tiret dans le domaine', 'marc@my-site.fr'],
  ])('RM11 : accepte un email avec %s', (_label, wellFormedEmail) => {
    expect(getInvalidSignupFields({ ...validValues, email: wellFormedEmail })).toEqual([])
  })

  it("RM11 : accepte un email bien formé entouré d'espaces (trimé avant validation)", () => {
    expect(getInvalidSignupFields({ ...validValues, email: '  marc@x.com  ' })).toEqual([])
  })

  it("RM11 : signale un email mal formé même entouré d'espaces", () => {
    expect(getInvalidSignupFields({ ...validValues, email: '  marc@localhost  ' })).toEqual(['email'])
  })

  it('RM11 : signale un email vide', () => {
    expect(getInvalidSignupFields({ ...validValues, email: '' })).toEqual(['email'])
  })

  it('RM20 : signale un mot de passe de 7 caractères', () => {
    expect(getInvalidSignupFields({ ...validValues, password: '1234567' })).toEqual(['password'])
  })

  it("RM20 : accepte un mot de passe d'exactement 8 caractères", () => {
    expect(getInvalidSignupFields({ ...validValues, password: '12345678' })).toEqual([])
  })

  it('RM20 : signale un mot de passe vide', () => {
    expect(getInvalidSignupFields({ ...validValues, password: '' })).toEqual(['password'])
  })

  it('signale les trois champs quand tout est invalide', () => {
    const invalidValues = { name: ' ', email: 'x', password: 'abc' }

    expect(getInvalidSignupFields(invalidValues)).toEqual(['name', 'email', 'password'])
  })
})

describe('getInvalidSigninFields — RM10 / RM11 / RM20 : aucun format vérifié au signin', () => {
  it('ne signale rien pour un email mal formé et un mot de passe court', () => {
    const malformedValues = { email: 'pas-un-email', password: 'abc' }

    expect(getInvalidSigninFields(malformedValues)).toEqual([])
  })
})
