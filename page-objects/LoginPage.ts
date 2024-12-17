import {expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    // Define Selectors
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly errorMessage: Locator
    readonly titleText: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator('#user-name')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('#login-button')
        this.errorMessage = page.locator('h3')
        this.titleText = page.locator('text=Swag Labs')
    }

    // Define login page methods 
    async visit() {
        await this.page.goto('https://www.saucedemo.com/')
    }

    async assertTitle() {
        await this.page.waitForSelector('text=Swag Labs', {state: 'visible'})
        expect(this.titleText).toBeVisible
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service')
    }
}