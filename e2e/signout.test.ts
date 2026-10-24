import { expect, test } from '@playwright/test'

import { connectedTitle, createAccount, headerAction, signinThroughUi, uniqueEmail } from './support/auth'

const VISITOR_TITLE = 'Prêt(e) pour ton daily standup ?'

test('SM-15 : déconnexion silencieuse', async ({ page, request }) => {
  const email = uniqueEmail('sm15')
  await createAccount(request, email)
  await signinThroughUi(page, email)
  await page.reload()
  await expect(connectedTitle(page)).toBeVisible()

  await page.getByRole('button', { name: 'Se déconnecter' }).click()

  await expect(page.getByRole('heading', { name: VISITOR_TITLE })).toBeVisible()
  await expect(headerAction(page, 'Se connecter')).toBeVisible()
  await expect(headerAction(page, 'Créer un compte')).toBeVisible()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('[data-sonner-toast]')).toHaveCount(0)

  await page.reload()

  await expect(page.getByRole('heading', { name: VISITOR_TITLE })).toBeVisible()
  await expect(headerAction(page, 'Se connecter')).toBeVisible()
})

test('SM-16 : session expirée, accueil visiteur sans message', async ({ page, context, request }) => {
  const email = uniqueEmail('sm16')
  await createAccount(request, email)
  await signinThroughUi(page, email)
  await page.reload()
  await expect(connectedTitle(page)).toBeVisible()

  await context.clearCookies({ name: /session_token/ })
  await page.reload()

  await expect(page.getByRole('heading', { name: VISITOR_TITLE })).toBeVisible()
  await expect(headerAction(page, 'Se connecter')).toBeVisible()
  await expect(headerAction(page, 'Créer un compte')).toBeVisible()
  await expect(page.locator('[data-sonner-toast]')).toHaveCount(0)
  await expect(page.getByRole('alert')).toHaveCount(0)
})
