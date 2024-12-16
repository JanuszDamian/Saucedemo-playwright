import { test, expect } from '@playwright/test'

test("Simple basic test", async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    const pageTitle = await page.locator('text=Swag Labs')
    await expect(pageTitle).toBeVisible
})