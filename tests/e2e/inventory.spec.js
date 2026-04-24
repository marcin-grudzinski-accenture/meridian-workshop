import { test, expect } from '@playwright/test'

test.describe('Inventory', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory')
    await expect(page.locator('h2')).toHaveText('Inventory')
    await expect(page.locator('table')).toBeVisible({ timeout: 5000 })
  })

  test('loads inventory table with data', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    expect(await rows.count()).toBeGreaterThan(0)
  })

  test('displays SKU, name, warehouse, and quantity columns', async ({ page }) => {
    const headers = page.locator('thead th')
    const headerTexts = await headers.allTextContents()
    expect(headerTexts.some(h => h.includes('SKU'))).toBeTruthy()
    expect(headerTexts.some(h => h.includes('Name') || h.includes('Item'))).toBeTruthy()
    expect(headerTexts.some(h => h.includes('Location') || h.includes('Category'))).toBeTruthy()
    expect(headerTexts.some(h => h.includes('Quantity'))).toBeTruthy()
  })

  test('warehouse filter narrows results', async ({ page }) => {
    const allRows = await page.locator('tbody tr').count()

    await page.locator('select').nth(1).selectOption('San Francisco')
    await page.waitForTimeout(500)

    const filteredRows = await page.locator('tbody tr').count()
    expect(filteredRows).toBeLessThan(allRows)
    expect(filteredRows).toBeGreaterThan(0)
  })

  test('category filter narrows results', async ({ page }) => {
    const allRows = await page.locator('tbody tr').count()

    await page.locator('select').nth(2).selectOption('Sensors')
    await page.waitForTimeout(500)

    const filteredRows = await page.locator('tbody tr').count()
    expect(filteredRows).toBeLessThan(allRows)
    expect(filteredRows).toBeGreaterThan(0)
  })

  test('search filters by item name', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i)
    await searchInput.fill('sensor')
    await page.waitForTimeout(300)

    const rows = page.locator('tbody tr')
    expect(await rows.count()).toBeGreaterThan(0)
    const firstRowText = await rows.first().textContent()
    expect(firstRowText?.toLowerCase()).toContain('sensor')
  })
})
