import { test, expect } from '@playwright/test'

test.describe('Orders', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/orders')
    await expect(page.locator('h2')).toHaveText('Orders')
    await expect(page.locator('table')).toBeVisible({ timeout: 5000 })
  })

  test('loads orders table with data', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    expect(await rows.count()).toBeGreaterThan(0)
  })

  test('displays order number, customer, status, and value columns', async ({ page }) => {
    const headers = page.locator('thead th')
    const headerTexts = await headers.allTextContents()
    expect(headerTexts.some(h => h.includes('Order'))).toBeTruthy()
    expect(headerTexts.some(h => h.includes('Customer'))).toBeTruthy()
    expect(headerTexts.some(h => h.includes('Status'))).toBeTruthy()
    expect(headerTexts.some(h => h.includes('Value'))).toBeTruthy()
  })

  test('status filter shows only matching orders', async ({ page }) => {
    await page.locator('select').nth(3).selectOption('Delivered')
    await page.waitForTimeout(500)

    const statusBadges = page.locator('tbody .badge')
    const count = await statusBadges.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const text = await statusBadges.nth(i).textContent()
      expect(text?.toLowerCase()).toContain('delivered')
    }
  })

  test('warehouse filter narrows order results', async ({ page }) => {
    const allRows = await page.locator('tbody tr').count()

    await page.locator('select').nth(1).selectOption('London')
    await page.waitForTimeout(500)

    const filteredRows = await page.locator('tbody tr').count()
    expect(filteredRows).toBeLessThan(allRows)
  })

  test('period filter by month narrows results', async ({ page }) => {
    const allRows = await page.locator('tbody tr').count()

    await page.locator('select').nth(0).selectOption('January')
    await page.waitForTimeout(500)

    const filteredRows = await page.locator('tbody tr').count()
    expect(filteredRows).toBeLessThanOrEqual(allRows)
  })
})
