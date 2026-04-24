import { test, expect } from '@playwright/test'

test.describe('Restocking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/restocking')
    await expect(page.locator('h2')).toBeVisible()
  })

  test('shows budget input and Get Recommendations button on load', async ({ page }) => {
    await expect(page.getByLabel(/budget ceiling/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /get recommendations/i })).toBeVisible()
  })

  test('shows prompt text before any budget is entered', async ({ page }) => {
    await expect(page.locator('.prompt-state')).toBeVisible()
    await expect(page.locator('.prompt-state')).toContainText(/get recommendations/i)
  })

  test('loads recommendations for a given budget', async ({ page }) => {
    await page.getByLabel(/budget ceiling/i).fill('50000')
    await page.getByRole('button', { name: /get recommendations/i }).click()

    await expect(page.locator('table')).toBeVisible({ timeout: 5000 })
    const rows = page.locator('tbody tr')
    expect(await rows.count()).toBeGreaterThan(0)
  })

  test('summary bar shows item count, total cost, and budget remaining', async ({ page }) => {
    await page.getByLabel(/budget ceiling/i).fill('50000')
    await page.getByRole('button', { name: /get recommendations/i }).click()
    await expect(page.locator('table')).toBeVisible({ timeout: 5000 })

    const summary = page.locator('.summary-bar')
    await expect(summary).toBeVisible()
    await expect(summary.locator('.summary-item')).toHaveCount(3)
    await expect(summary.locator('.summary-value').first()).toBeVisible()
  })

  test('small budget returns fewer recommendations than large budget', async ({ page }) => {
    await page.getByLabel(/budget ceiling/i).fill('100')
    await page.getByRole('button', { name: /get recommendations/i }).click()
    await page.waitForSelector('.loading', { state: 'hidden', timeout: 5000 })
    const smallBudgetRows = await page.locator('tbody tr').count()

    await page.getByLabel(/budget ceiling/i).fill('500000')
    await page.getByRole('button', { name: /get recommendations/i }).click()
    await expect(page.locator('table')).toBeVisible({ timeout: 5000 })
    const largeBudgetRows = await page.locator('tbody tr').count()

    expect(largeBudgetRows).toBeGreaterThanOrEqual(smallBudgetRows)
  })

  test('warehouse filter reloads after initial load', async ({ page }) => {
    await page.getByLabel(/budget ceiling/i).fill('500000')
    await page.getByRole('button', { name: /get recommendations/i }).click()
    await expect(page.locator('table')).toBeVisible({ timeout: 5000 })
    const allRows = await page.locator('tbody tr').count()

    await page.locator('.filter-group').filter({ hasText: /location/i }).locator('select').selectOption('Tokyo')
    await page.waitForSelector('.loading', { state: 'hidden', timeout: 5000 })

    const filteredRows = await page.locator('tbody tr').count()
    expect(filteredRows).toBeLessThanOrEqual(allRows)
  })

  test('table shows SKU, suggested qty, and estimated cost columns', async ({ page }) => {
    await page.getByLabel(/budget ceiling/i).fill('50000')
    await page.getByRole('button', { name: /get recommendations/i }).click()
    await expect(page.locator('table')).toBeVisible({ timeout: 5000 })

    const headers = page.locator('thead th')
    const headerTexts = await headers.allTextContents()
    expect(headerTexts.some(h => h.includes('SKU'))).toBeTruthy()
    expect(headerTexts.some(h => h.includes('Suggested'))).toBeTruthy()
    expect(headerTexts.some(h => h.includes('Estimated'))).toBeTruthy()
  })
})
