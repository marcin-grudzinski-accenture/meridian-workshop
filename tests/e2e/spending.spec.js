import { test, expect } from '@playwright/test'

test.describe('Spending / Finance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/spending')
    await expect(page.locator('h2')).toHaveText('Finance Dashboard')
  })

  test('loads without errors', async ({ page }) => {
    await page.waitForTimeout(1000)
    expect(await page.locator('.error').count()).toBe(0)
  })

  test('shows summary stat cards', async ({ page }) => {
    const statCards = page.locator('.stat-card, .kpi-card, .summary-card').first()
    await expect(statCards).toBeVisible({ timeout: 5000 })
  })

  test('shows a transactions or spending table', async ({ page }) => {
    await expect(page.locator('table').first()).toBeVisible({ timeout: 5000 })
    const rows = page.locator('tbody tr')
    expect(await rows.count()).toBeGreaterThan(0)
  })
})
