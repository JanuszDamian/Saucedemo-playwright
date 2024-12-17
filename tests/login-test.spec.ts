import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductPage } from '../page-objects/ProductPage'

test.describe.parallel('Login flow', () => {
    let loginPage: LoginPage
    let productPage: ProductPage

    // Before Hook
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)

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

    test('Positive scenario, correct username and password', async ({page}) => {
        await loginPage.login("standard_user", "secret_sauce")
        await productPage.assertLoginUser()
    })
})