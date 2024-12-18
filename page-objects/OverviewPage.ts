import {expect, Locator, Page } from '@playwright/test'

export class OverviewPage {
    // Define Selectors
    readonly page: Page
    readonly overviewPageTitle: Locator
    readonly finishButton: Locator
    readonly cancelButton: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.overviewPageTitle = page.locator('#header_container span:has-text("Checkout: Overview")')
        this.finishButton = page.locator('#finish')
        this.cancelButton = page.locator('#cancel')
    }

    // Define login page methods 
    async assertOverviewPage() {
        await this.page.waitForSelector('#header_container span:has-text("Checkout: Overview")', {state: 'visible'})
        await expect(this.overviewPageTitle).toBeVisible
    }

    async Cancel() {
        await this.cancelButton.click()
    }

    async finishProcess() {
        await this.finishButton.click()
    }

}