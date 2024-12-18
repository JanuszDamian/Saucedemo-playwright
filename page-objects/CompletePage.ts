import {expect, Locator, Page } from '@playwright/test'

export class CompletePage {
    // Define Selectors
    readonly page: Page
    readonly completePageTitle: Locator
    readonly backButton: Locator
    readonly completeConfirm: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.completePageTitle = page.locator('#header_container text="Checkout: Complete!"')
        this.backButton = page.locator('#back-to-products')
        this.completeConfirm = page.locator('#checkout_complete_container')
    }

    // Define login page methods 
    async assertCompletePage() {
        await this.page.waitForSelector('#header_container text="Checkout: Complete!"', {state: 'visible'})
        await expect(this.completePageTitle).toBeVisible
    }
    
    async assertCompleteConfirm() {
        await this.page.waitForSelector('#checkout_complete_container', {state: 'visible'})
        await expect(this.completeConfirm).toBeVisible
    }

    async backHome() {
        await this.backButton.click()
    }

}