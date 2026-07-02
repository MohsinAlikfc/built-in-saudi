import { defineConfig, devices } from '@playwright/test'

// E2E against the built site. `BASE_URL` skips the local webServer (used when a
// server is already running, e.g. in Docker). Otherwise Playwright serves the
// production build via `vite preview`.
const BASE_URL = process.env.BASE_URL || 'http://localhost:4173'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run preview -- --port 4173',
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
