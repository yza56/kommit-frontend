import { expect, test } from '@playwright/test'

import { headerAction } from './support/auth'

test("SM-1 : accueil visiteur, message d'accueil et boutons du header", async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Prêt(e) pour ton daily standup ?' })).toBeVisible()
  await expect(headerAction(page, 'Se connecter')).toBeVisible()
  await expect(headerAction(page, 'Créer un compte')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Se déconnecter' })).toHaveCount(0)
  const footerBox = await page.getByRole('contentinfo').boundingBox()
  expect(footerBox!.width).toBe(page.viewportSize()!.width)
})

test('SM-2 : lien ViDev du footer, ouverture dans un nouvel onglet', async ({ page, context }) => {
  await context.route('https://www.youtube.com/**', (route) => route.fulfill({ body: '' }))
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Prêt(e) pour ton daily standup ?' })).toBeVisible()

  const popupPromise = page.waitForEvent('popup')
  await page.getByRole('contentinfo').getByRole('link', { name: 'ViDev' }).click()
  const popup = await popupPromise

  await expect(popup).toHaveURL('https://www.youtube.com/@videv9858')
  await expect(page).toHaveURL('/')
})
