import {expect, Locator, Page } from '@playwright/test'

export class CartPage {
    // Define Selectors
    readonly page: Page
    readonly cartPageTitle: Locator
    readonly continueShopButton: Locator
    readonly checkoutButton: Locator
    readonly backPackRemoveButton: Locator
    readonly bikeLightRemoveButton: Locator
    readonly boltTshirtRemoveButton: Locator
    readonly fleeceJacketRemoveButton: Locator
    readonly onesieRemoveButton: Locator
    readonly redTShirtRemoveButton: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.cartPageTitle = page.locator('#header_container span:has-text("Your Cart")')
        this.continueShopButton = page.locator('#continue-shopping')
        this.checkoutButton = page.locator('#checkout')
        this.backPackRemoveButton = page.locator('#remove-sauce-labs-backpack')
        this.bikeLightRemoveButton = page.locator('#remove-sauce-labs-bike-light')
        this.boltTshirtRemoveButton = page.locator('#remove-sauce-labs-bolt-t-shirt')
        this.fleeceJacketRemoveButton = page.locator('#remove-sauce-labs-fleece-jacket')
        this.onesieRemoveButton = page.locator('#remove-sauce-labs-onesie')
        this.redTShirtRemoveButton = page.locator('button[id*="red"]')
    }

    // Define login page methods 
    async assertCartPage() {
        await this.page.waitForSelector('#header_container span:has-text("Your Cart")', {state: 'visible'})
        await expect(this.cartPageTitle).toBeVisible
    }

    async removeAllProducts() {
        await this.backPackRemoveButton.click()
        await this.bikeLightRemoveButton.click()
        await this.boltTshirtRemoveButton.click()
        await this.fleeceJacketRemoveButton.click()
        await this.onesieRemoveButton.click()
        await this.redTShirtRemoveButton.click()
        await this.continueShopButton.click()
    }

    async checkout() {
        await this.checkoutButton.click()
    }
}