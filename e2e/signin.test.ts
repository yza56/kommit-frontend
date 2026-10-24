import { expect, test } from '@playwright/test'

import { connectedTitle, createAccount, delayRequest, fillSignin, headerAction, uniqueEmail } from './support/auth'

const SIGNIN_URL = '**/api/auth/sign-in/email'

test("SM-7 : bouton en chargement, spinner et texte aria", async ({ page, request }) => {
  const email = uniqueEmail('sm7')
  await createAccount(request, email)
  await delayRequest(page, SIGNIN_URL, 1500)
  await page.goto('/signin')
  await fillSignin(page, email)

  await page.getByRole('button', { name: 'Me connecter' }).click()

  const loadingButton = page.getByRole('button', { name: 'Connexion en cours' })
  await expect(loadingButton).toBeDisabled()
  await expect(loadingButton).not.toContainText('Me connecter')
  await expect(loadingButton.getByText('Connexion en cours')).toHaveClass(/sr-only/)
  await expect(connectedTitle(page)).toBeVisible()
})

test('SM-8 : double-clic sur le bouton, une seule requête', async ({ page, request }) => {
  const email = uniqueEmail('sm8')
  await createAccount(request, email)
  const signinRequests = { count: 0 }
  await delayRequest(page, SIGNIN_URL, 1500, signinRequests)
  await page.goto('/signin')
  await fillSignin(page, email)

  await page.getByRole('button', { name: 'Me connecter' }).dblclick()

  await expect(page).toHaveURL('/')
  await expect(connectedTitle(page)).toBeVisible()
  expect(signinRequests.count).toBe(1)
})

test("SM-10 : signin réussi, retour sur l'accueil connecté", async ({ page, request }) => {
  const email = uniqueEmail('sm10')
  await createAccount(request, email)
  await page.goto('/signin')
  await fillSignin(page, email)

  await page.getByRole('button', { name: 'Me connecter' }).click()

  await expect(page).toHaveURL('/')
  await expect(connectedTitle(page)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Se déconnecter' })).toBeVisible()
  await expect(headerAction(page, 'Se connecter')).toHaveCount(0)
  await expect(headerAction(page, 'Créer un compte')).toHaveCount(0)
})

test('SM-12 : toast après un signin', async ({ page, request }) => {
  const email = uniqueEmail('sm12')
  await createAccount(request, email)
  await page.goto('/signin')
  await fillSignin(page, email)

  await page.getByRole('button', { name: 'Me connecter' }).click()

  const toast = page.getByText('Content de te revoir Marc.')
  await expect(page).toHaveURL('/')
  await expect(toast).toBeVisible()
  const box = (await toast.boundingBox())!
  const viewport = page.viewportSize()!
  expect(box.x).toBeGreaterThan(viewport.width / 2)
  expect(box.y).toBeLessThan(viewport.height / 3)
  await expect(page.getByRole('button', { name: 'Close toast' })).toBeVisible()
})
