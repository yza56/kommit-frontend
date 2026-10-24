import { expect, type APIRequestContext, type Page } from '@playwright/test'

export const API_URL = 'http://localhost:3000'
export const PASSWORD = 'motdepasse8'
export const FIRST_NAME = 'Marc'

export const uniqueEmail = (prefix: string) => `marc.${prefix}.${Date.now()}.${Math.floor(Math.random() * 1e6)}@test.dev`

export async function createAccount(request: APIRequestContext, email: string) {
  const response = await request.post(`${API_URL}/api/auth/sign-up/email`, {
    headers: { Origin: 'http://localhost:5173' },
    data: { name: FIRST_NAME, email, password: PASSWORD },
  })

  expect(response.ok()).toBeTruthy()
}

export async function fillSignin(page: Page, email: string, password = PASSWORD) {
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Mot de passe').fill(password)
}

export async function fillSignup(page: Page, email: string, password = PASSWORD) {
  await page.getByLabel('Prénom').fill(FIRST_NAME)
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Mot de passe').fill(password)
}

export const headerAction = (page: Page, name: string) => page.getByRole('banner').getByRole('button', { name })

export const connectedTitle = (page: Page) => page.getByRole('heading', { name: "Quoi de neuf aujourd'hui, Marc ?" })

export const signupSubmit = (page: Page) => page.getByRole('button', { name: 'Créer un compte' }).last()

export async function signinThroughUi(page: Page, email: string) {
  await page.goto('/signin')
  await fillSignin(page, email)
  await page.getByRole('button', { name: 'Me connecter' }).click()
  await expect(connectedTitle(page)).toBeVisible()
}

export async function delayRequest(page: Page, urlPattern: string, delayMs: number, counter?: { count: number }) {
  await page.route(urlPattern, async (route) => {
    if (route.request().method() === 'POST' && counter) counter.count += 1
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    await route.continue()
  })
}
