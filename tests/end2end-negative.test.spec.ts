import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductPage } from '../page-objects/ProductPage'
import { CartPage } from '../page-objects/CartPage'
import { CheckoutPage } from '../page-objects/CheckoutPage'
import { OverviewPage } from '../page-objects/OverviewPage'
import { CompletePage } from '../page-objects/CompletePage'

test.describe.parallel('Negative tests', () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let overviewPage: OverviewPage
    let completePage: CompletePage

    // Before Hook
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        overviewPage = new OverviewPage(page)
        completePage = new CompletePage(page)

        await loginPage.visit()
        await loginPage.login("error_user", "secret_sauce")
        await productPage.assertLoginUser()
    })

    // Negative Scenario

    test('Add products to cart', async () => {
        await productPage.addAllProductsToCart()
        await productPage.assertAllProductsInCart()
    })

    test('Remove product from cart', async () => {
        await productPage.addAllProductsToCart()
        await productPage.removeAllProductsFromCart()
        await productPage.assertBadgeIcon()
    })

    // After Hook
    test.afterEach(async () => {
        await productPage.logout()
        await loginPage.assertloginPage()
    })
})