import {expect, Locator, Page } from '@playwright/test'

export class ProductPage {
    // Define Selectors
    readonly page: Page
    readonly shoppingCartButton: Locator
    readonly shoppingCartBadgeIcon: Locator
    readonly backpackAddButton: Locator
    readonly backpackLink: Locator
    readonly backpackRemoveButton: Locator
    readonly backpackPrice: Locator
    readonly bikeLightAddButton: Locator
    readonly bikeLightLink: Locator
    readonly bikeLightRemoveButton: Locator
    readonly bikeLightPrice: Locator
    readonly boltTShirtAddButton: Locator
    readonly boltTShirtLink: Locator
    readonly boltTshirtRemoveButton: Locator
    readonly boltTshirtPrice: Locator
    readonly fleeceJacketAddButton: Locator
    readonly fleeceJacketLink: Locator
    readonly fleeceJacketRemoveButton: Locator
    readonly fleeceJacketPrice: Locator
    readonly onesieAddButton: Locator
    readonly onesieLink: Locator
    readonly onesieRemoveButton: Locator
    readonly onesiePrice: Locator
    readonly redTShirtAddButton: Locator
    readonly redTShirtLink: Locator
    readonly redTShirtRemoveButton: Locator
    readonly redTShirtPrice: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.shoppingCartButton = page.locator('#shopping_cart_container')
        this.shoppingCartBadgeIcon = page.locator('#shopping_cart_container > a > span.shopping_cart_badge')
        this.backpackAddButton = page.locator('#add-to-cart-sauce-labs-backpack')
        this.backpackLink = page.locator('text=Sauce Labs Backpack')
        this.backpackRemoveButton = page.locator('#remove-sauce-labs-backpack')
        this.backpackPrice = page.locator('xpath=//button[@id="add-to-cart-sauce-labs-backpack"]/preceding-sibling::div')
        this.bikeLightAddButton = page.locator('#add-to-cart-sauce-labs-bike-light')
        this.bikeLightLink = page.locator('text=Sauce Labs Bike Light')
        this.bikeLightRemoveButton = page.locator('#remove-sauce-labs-bike-light')
        this.bikeLightPrice = page.locator('')
        this.boltTShirtAddButton = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt')
        this.boltTShirtLink = page.locator('text=Sauce Labs Bolt T-Shirt')
        this.boltTshirtRemoveButton = page.locator('#remove-sauce-labs-bolt-t-shirt')
        this.boltTshirtPrice = page.locator('')
        this.fleeceJacketAddButton = page.locator('#add-to-cart-sauce-labs-fleece-jacket')
        this.fleeceJacketLink = page.locator('text=Sauce Labs Fleece Jacket')
        this.fleeceJacketRemoveButton = page.locator('#remove-sauce-labs-fleece-jacket')
        this.fleeceJacketPrice = page.locator('')
        this.onesieAddButton = page.locator('#add-to-cart-sauce-labs-onesie')
        this.onesieLink = page.locator('text=Sauce Labs Onesie')
        this.onesieRemoveButton = page.locator('#remove-sauce-labs-onesie')
        this.onesiePrice = page.locator('')
        this.redTShirtAddButton = page.locator('#add\-to\-cart\-test\.allthethings\(\)\-t\-shirt\-\(red\)')
        this.redTShirtLink = page.locator('text=Test.allTheThings() T-Shirt (Red)')
        this.redTShirtRemoveButton = page.locator('#remove-test.allthethings()-t-shirt-(red)')
        this.redTShirtPrice = page.locator('')
    }
        
    // Define login page methods 

    async assertLoginUser() {
        await this.page.waitForSelector('#shopping_cart_container', {state: 'visible'})
        await expect(this.shoppingCartButton).toBeVisible
    }

    async addAllProductToCart() {
        await this.backpackAddButton.click()
        await this.bikeLightAddButton.click()
        await this.boltTShirtAddButton.click()
        await this.fleeceJacketAddButton.click()
        await this.onesieAddButton.click()
        await this.redTShirtAddButton.click()
        await expect(this.shoppingCartBadgeIcon).toHaveText('6')
    }
}