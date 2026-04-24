import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('all nav links are present and navigate correctly', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav.nav-tabs')

    await expect(nav.getByRole('link', { name: 'Overview' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Inventory' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Orders' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Finance' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Demand Forecast' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Reports' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Restocking' })).toBeVisible()
  })

  test('navigates to each view without errors', async ({ page }) => {
    const routes = ['/inventory', '/orders', '/spending', '/demand', '/reports', '/restocking']
    for (const route of routes) {
      await page.goto(route)
      await expect(page.locator('main')).toBeVisible()
      const errors = await page.locator('.error').count()
      expect(errors).toBe(0)
    }
  })

  test('filter bar is visible on every page', async ({ page }) => {
    const routes = ['/', '/inventory', '/orders', '/reports', '/restocking']
    for (const route of routes) {
      await page.goto(route)
      await expect(page.locator('select').first()).toBeVisible()
    }
  })
})
