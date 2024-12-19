import {test} from '@playwright/test'
import {LoginPage} from '../../page-objects/LoginPage'

test.describe("Login Page Visual Test", () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)

        await loginPage.visit()
    })

    test("Login Form", async ({page}) => {
        await loginPage.snapshotLoginForm()
    })

    test("Login Error Message", async ({page}) => {
        await loginPage.login("invalid username", "invalid password")
        await loginPage.snapshotErrorMessage()
    })

})