import { test, expect } from '@playwright/test'

// Smoke test: the tool renders and validates client-side before any sign-in /
// backend call. (The AI analysis itself needs Google auth + the live function,
// so it's out of scope for e2e.)
test('prompt analyzer renders and rejects a too-short prompt', async ({ page }) => {
  await page.goto('/en/apps/prompt-analyzer')
  await expect(page.getByTestId('prompt-analyzer')).toBeVisible()
  await expect(page.getByTestId('pa-input')).toBeVisible()

  // A short prompt is rejected locally with a hint — no sign-in prompt needed.
  await page.getByTestId('pa-input').fill('too short')
  await page.getByTestId('pa-run').click()
  await expect(page.getByTestId('pa-err')).toContainText('longer')
})
