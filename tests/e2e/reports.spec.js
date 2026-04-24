import { test, expect } from '@playwright/test'

test.describe('Reports', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reports')
    await expect(page.locator('h2')).toHaveText('Performance Reports')
    await expect(page.locator('table').first()).toBeVisible({ timeout: 5000 })
  })

  test('loads quarterly performance table', async ({ page }) => {
    const rows = page.locator('table').first().locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    expect(await rows.count()).toBeGreaterThan(0)
  })

  test('quarterly table shows Q labels', async ({ page }) => {
    const firstCell = page.locator('table').first().locator('tbody td').first()
    await expect(firstCell).toContainText('Q')
  })

  test('monthly trend chart is visible', async ({ page }) => {
    const chart = page.locator('.bar-chart')
    await expect(chart).toBeVisible()
    const bars = chart.locator('.bar')
    expect(await bars.count()).toBeGreaterThan(0)
  })

  test('summary stats show four cards', async ({ page }) => {
    const statCards = page.locator('.stat-card')
    await expect(statCards).toHaveCount(4)
  })

  test('refresh button reloads data', async ({ page }) => {
    const refreshBtn = page.getByRole('button', { name: /refresh/i })
    await expect(refreshBtn).toBeVisible()
    await refreshBtn.click()
    // After reload data should still be present
    await expect(page.locator('table').first().locator('tbody tr').first()).toBeVisible({ timeout: 5000 })
  })

  test('warehouse filter updates report data', async ({ page }) => {
    const rowsBefore = await page.locator('table').first().locator('tbody tr').count()

    await page.locator('select').nth(1).selectOption('Tokyo')
    await page.waitForTimeout(500)

    // Page should still show data (not error) — may have fewer rows
    await expect(page.locator('h2')).toHaveText('Performance Reports')
    expect(await page.locator('.error').count()).toBe(0)

    // Reset
    await page.locator('select').nth(1).selectOption({ label: 'All' })
    await page.waitForTimeout(300)
    const rowsAfter = await page.locator('table').first().locator('tbody tr').count()
    expect(rowsAfter).toBeGreaterThanOrEqual(rowsBefore)
  })
})
