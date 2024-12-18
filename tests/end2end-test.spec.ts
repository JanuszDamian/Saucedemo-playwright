import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductPage } from '../page-objects/ProductPage'
import { CartPage } from '../page-objects/CartPage'
import { CheckoutPage } from '../page-objects/CheckoutPage'
import { OverviewPage } from '../page-objects/OverviewPage'
import { CompletePage } from '../page-objects/CompletePage'

test.describe.parallel('E2E tests', () => {
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
        await loginPage.login("standard_user", "secret_sauce")
        await productPage.assertLoginUser()
    })

    // Positive Scenario
    test('Buy all products', async ({page}) => {
        await productPage.addAllProductsToCart()
        await productPage.assertAllProductsInCart()
        await productPage.goToCartPage()
        await cartPage.assertCartPage()
        await cartPage.checkout()
        await checkoutPage.assertCheckoutPage()
        await checkoutPage.fillForm("Tomasz", "Damian", "15-800")
        await overviewPage.assertOverviewPage()
        await overviewPage.finishProcess()
        await completePage.assertCompletePage()
        await completePage.assertCompleteConfirm()
        await completePage.backHome()
        await productPage.assertLoginUser()
    })

    test('Cancel transaction at overviewPage', async ({page}) => {
        await productPage.addAllProductsToCart()
        await productPage.goToCartPage()
        await cartPage.assertCartPage()
        await cartPage.checkout()
        await checkoutPage.assertCheckoutPage()
        await checkoutPage.fillForm("Tomasz", "Damian", "15-800")
        await overviewPage.assertOverviewPage()
        await overviewPage.Cancel()
        await productPage.assertLoginUser()
    })

        // After Hook
        test.afterEach(async ({ page }) => {
            await productPage.logout()
            await loginPage.assertloginPage()
        })
})