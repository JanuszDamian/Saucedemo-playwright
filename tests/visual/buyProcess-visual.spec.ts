import {test} from '@playwright/test'
import {LoginPage} from '../../page-objects/LoginPage'
import { ProductPage } from '../../page-objects/ProductPage'
import { CartPage} from '../../page-objects/CartPage'
import { CheckoutPage } from '../../page-objects/CheckoutPage'
import { OverviewPage } from '../../page-objects/OverviewPage'
import { CompletePage } from '../../page-objects/CompletePage'

test.describe("Complete Page Visual Test", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let overviewPage: OverviewPage
    let completePage: CompletePage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        overviewPage = new OverviewPage(page)
        completePage = new CompletePage(page)

        await loginPage.visit()
        await loginPage.login("standard_user", "secret_sauce")
        await productPage.addAllProductsToCart()
        await productPage.goToCartPage()
        await cartPage.checkout()
    })

    test("Complete Page", async ({page}) => {
        await checkoutPage.fillForm("Tomasz","Damian","11-111")
        await overviewPage.finishProcess()

        await completePage.snapshotCompleteConfirm() 
    })

    test("CheckoutPage, continue without fill form", async ({page}) => {
        await checkoutPage.continueWithoutFill()

        await checkoutPage.snapshotErrorMessage()
    })
})