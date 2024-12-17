import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'

test.describe.parallel.only('Login flow', () => {
    let loginPage: LoginPage

    // Before Hook
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)

        await loginPage.visit()
        await loginPage.assertTitle()
    })

    // Negative Scenario
    test('Negative scenario for invalid username', async ({page}) => {
        await loginPage.login("invalid username", "secret_sauce")
        await loginPage.assertErrorMessage()
    })

    test('Negative scenario for invalid password', async ({page}) => {
        await loginPage.login("standard_user", "invalid password")
        await loginPage.assertErrorMessage()
    })

    test('Negative scenario for invalid username and invalid password', async ({page}) => {
        await loginPage.login("invalid username", "invalid password")
        await loginPage.assertErrorMessage()
    })

    // Positive Scenario

    test('Positive scenario', async ({page}) => {
        await loginPage.login("standard_user", "secret_sauce")
    })
})