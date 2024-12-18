import {expect, Locator, Page } from '@playwright/test'

export class CheckoutPage {
    // Define Selectors
    readonly page: Page
    readonly checkoutPageTitle: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly zipCodeInput: Locator
    readonly continuceButton: Locator
    readonly cancelButton: Locator
    readonly errorMessage: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.checkoutPageTitle = page.locator('#header_container text="Checkout: Your Information"')
        this.firstNameInput = page.locator('#firstName')
        this.lastNameInput = page.locator('#last-name')
        this.zipCodeInput = page.locator('#postal-code')
        this.continuceButton = page.locator('#continue')
        this.cancelButton = page.locator('#cancel')
        this.errorMessage = page.locator('.error-message-container error')
    }

    // Define login page methods 
    async assertCheckoutPage() {
        await this.page.waitForSelector('#header_container text="Checkout: Your Information"', {state: 'visible'})
        await expect(this.checkoutPageTitle).toBeVisible
    }

    async Cancel() {
        await this.cancelButton.click()
    }

    async continueWithoutFill() {
        await this.continuceButton.click()
        await expect(this.errorMessage).toBeVisible
    }

    async fillForm(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.zipCodeInput.fill(zipCode)
        await this.continuceButton.click()
    }


}