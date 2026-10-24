import { defineConfig, devices } from '@playwright/test'

const headed = process.env.HEADED === '1'

export default defineConfig({
  testDir: 'e2e',
  workers: headed ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    headless: !headed,
    launchOptions: { slowMo: headed ? Number(process.env.SLOWMO ?? 800) : 0 },
  },
  projects: [
    {
      name: 'deterministic',
      testIgnore: '**/*.nondet.test.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'nondet',
      testMatch: '**/*.nondet.test.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
})
