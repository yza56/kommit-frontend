import { expect, test } from '@playwright/test'

import { connectedTitle, createAccount, fillSignin, headerAction, signupSubmit, uniqueEmail } from './support/auth'

test('SM-3 : du header vers la page de signup', async ({ page }) => {
  await page.goto('/')

  await headerAction(page, 'Créer un compte').click()

  await expect(page).toHaveURL('/signup')
  await expect(page.getByLabel('Prénom')).toBeVisible()
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Mot de passe')).toBeVisible()
  await expect(page.getByLabel('Confirmation')).toHaveCount(0)
  await expect(signupSubmit(page)).toBeVisible()
})

test('SM-4 : du header vers la page de signin', async ({ page }) => {
  await page.goto('/')

  await headerAction(page, 'Se connecter').click()

  await expect(page).toHaveURL('/signin')
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Mot de passe')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Me connecter' })).toBeDisabled()
})

test("SM-5 : le logo Kommit renvoie à l'accueil sur les 4 pages", async ({ page, request }) => {
  const email = uniqueEmail('sm5')
  await createAccount(request, email)
  const logo = page.getByRole('banner').getByRole('link', { name: 'Kommit' })
  await page.goto('/signup')

  await logo.click()
  await expect(page).toHaveURL('/')

  await logo.click()
  await expect(page).toHaveURL('/')
  await expect(headerAction(page, 'Se connecter')).toBeVisible()

  await headerAction(page, 'Se connecter').click()
  await expect(page).toHaveURL('/signin')
  await logo.click()
  await expect(page).toHaveURL('/')

  await headerAction(page, 'Se connecter').click()
  await fillSignin(page, email)
  await page.getByRole('button', { name: 'Me connecter' }).click()
  await expect(connectedTitle(page)).toBeVisible()
  await logo.click()
  await expect(page).toHaveURL('/')
  await expect(connectedTitle(page)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Se déconnecter' })).toBeVisible()
})
