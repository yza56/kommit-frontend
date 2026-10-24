import { expect, test } from '@playwright/test'

import { connectedTitle, delayRequest, fillSignup, headerAction, signupSubmit, uniqueEmail } from './support/auth'

const PASSWORD_ERROR = 'Le mot de passe doit contenir au moins 8 caractères.'

test('SM-6 : erreur de format affichée puis mise à jour pendant la saisie', async ({ page }) => {
  await page.goto('/signup')
  await page.getByLabel('Prénom').fill('Marc')
  await page.getByLabel('Email').fill(uniqueEmail('sm6'))
  await page.getByLabel('Mot de passe').fill('abc')

  await signupSubmit(page).click()

  await expect(page.getByText(PASSWORD_ERROR)).toBeVisible()
  await expect(page.getByLabel('Mot de passe')).toHaveAttribute('aria-invalid', 'true')
  await expect(page).toHaveURL('/signup')

  await page.getByLabel('Mot de passe').fill('abcdefgh')

  await expect(page.getByText(PASSWORD_ERROR)).toHaveCount(0)
  await expect(page.getByLabel('Mot de passe')).not.toHaveAttribute('aria-invalid', 'true')
})

test('SM-7 (variante signup) : bouton en chargement, spinner et texte aria', async ({ page }) => {
  await delayRequest(page, '**/api/auth/sign-up/email', 1500)
  await page.goto('/signup')
  await fillSignup(page, uniqueEmail('sm7up'))

  await signupSubmit(page).click()

  const loadingButton = page.getByRole('button', { name: 'Création du compte en cours' })
  await expect(loadingButton).toBeDisabled()
  await expect(loadingButton).not.toContainText('Créer un compte')
  await expect(loadingButton.getByText('Création du compte en cours')).toHaveClass(/sr-only/)
  await expect(connectedTitle(page)).toBeVisible()
})

test("SM-9 : signup réussi, retour sur l'accueil connecté", async ({ page }) => {
  await page.goto('/signup')
  await fillSignup(page, uniqueEmail('sm9'))

  await signupSubmit(page).click()

  await expect(page).toHaveURL('/')
  await expect(connectedTitle(page)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Se déconnecter' })).toBeVisible()
  await expect(headerAction(page, 'Se connecter')).toHaveCount(0)
  await expect(headerAction(page, 'Créer un compte')).toHaveCount(0)
})

test('SM-11 : toast après un signup', async ({ page }) => {
  await page.goto('/signup')
  await fillSignup(page, uniqueEmail('sm11'))

  await signupSubmit(page).click()

  const toast = page.getByText('Bienvenue Marc, ton compte est créé.')
  await expect(page).toHaveURL('/')
  await expect(toast).toBeVisible()
  const box = (await toast.boundingBox())!
  const viewport = page.viewportSize()!
  expect(box.x).toBeGreaterThan(viewport.width / 2)
  expect(box.y).toBeLessThan(viewport.height / 3)

  await page.getByRole('button', { name: 'Close toast' }).click()

  await expect(toast).toHaveCount(0)
})
