import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductPage } from '../page-objects/ProductPage'

test.describe.parallel('ProductPage tests', () => {
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

    test('Add/remove all products to/from cart ', async () => {
        await productPage.addAllProductsToCart()
        await productPage.assertAllProductsInCart()
        await productPage.removeAllProductsFromCart()
        await productPage.assertBadgeIcon()
    })
})