import {test, expect} from '@playwright/test'

test.describe("Visual Regression Testing",() => {
    test("Full Page Snapshot", async ({page}) => {
        await page.goto('https://www.saucedemo.com/')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })
})