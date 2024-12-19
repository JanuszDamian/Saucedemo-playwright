import {expect, Locator, Page } from '@playwright/test'

export class CheckoutPage {
    // Define Selectors
    readonly page: Page
    readonly checkoutPageTitle: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly zipCodeInput: Locator
    readonly continueButton: Locator
    readonly cancelButton: Locator
    readonly errorMessage: Locator
    readonly checkoutInfo: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.checkoutPageTitle = page.locator('#header_container span:has-text("Checkout: Your Information")')
        this.firstNameInput = page.locator('#first-name')
        this.lastNameInput = page.locator('#last-name')
        this.zipCodeInput = page.locator('#postal-code')
        this.continueButton = page.locator('#continue')
        this.cancelButton = page.locator('#cancel')
        this.errorMessage = page.locator('.error-message-container error')
        this.checkoutInfo = page.locator('.checkout_info')
    }

    // Define login page methods 
    async assertCheckoutPage() {
        await this.page.waitForSelector('#header_container span:has-text("Checkout: Your Information")', {state: 'visible'})
        expect(this.checkoutPageTitle).toBeVisible
    }

    async Cancel() {
        await this.cancelButton.click()
    }

    async continueWithoutFill() {
        await this.continueButton.click()
        expect(this.errorMessage).toBeVisible
    }

    async fillForm(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.zipCodeInput.fill(zipCode)
        await this.continueButton.click()
    }

    async snapshotErrorMessage() {
        expect(await this.checkoutInfo.screenshot()).toMatchSnapshot('Fill form-error.png')
    }

}