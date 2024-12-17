import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductPage } from '../page-objects/ProductPage'

test.describe.parallel.only('Login flow', () => {
    let loginPage: LoginPage
    let productPage: ProductPage

    // Before Hook
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)

        await loginPage.visit()
        await loginPage.login("standard_user", "secret_sauce")
        await productPage.assertLoginUser()
    })

    // Positive Scenario

    test('Add all product to cart', async ({page}) => {
        await productPage.addAllProductToCart()
    })
})