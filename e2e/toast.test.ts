import { expect, test } from '@playwright/test'

import { connectedTitle, createAccount, fillSignin, signinThroughUi, uniqueEmail } from './support/auth'

test('SM-13 : pas de toast au rechargement ni au retour du navigateur', async ({ page, request }) => {
  const email = uniqueEmail('sm13')
  await createAccount(request, email)
  const toast = page.getByText('Content de te revoir Marc.')
  await page.goto('/signin')
  await fillSignin(page, email)

  await page.getByRole('button', { name: 'Me connecter' }).click()
  await expect(toast).toBeVisible()

  await page.reload()
  await expect(connectedTitle(page)).toBeVisible()
  await expect(toast).toHaveCount(0)

  await page.goBack()
  await page.goForward()
  await expect(page).toHaveURL('/')
  await expect(connectedTitle(page)).toBeVisible()
  await expect(toast).toHaveCount(0)
})

test('SM-14 : pas de toast à l\'ouverture directe avec une session persistée', async ({ page, context, request }) => {
  const email = uniqueEmail('sm14')
  await createAccount(request, email)
  await signinThroughUi(page, email)
  const newTab = await context.newPage()

  await newTab.goto('/')

  await expect(connectedTitle(newTab)).toBeVisible()
  await expect(newTab.getByRole('button', { name: 'Se déconnecter' })).toBeVisible()
  await expect(newTab.getByText('Content de te revoir Marc.')).toHaveCount(0)
})
