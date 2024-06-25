import { Locator, Page, expect } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly cPanel: Locator
  readonly extensions: Locator
  readonly page_loaded: Locator

  constructor(page: Page) {
    this.page = page
    this.cPanel = page.locator('a', { hasText: 'Browse Products' }).nth(0)
    this.extensions = page.locator('a', { hasText: 'Browse Products' }).nth(1)
    this.page_loaded = page.locator('h2').nth(0)
  }

  async visit() {
    await this.page.goto('https://store.cpanel.net/index.php')
  }
  async page_load() {
    await expect(this.page_loaded).toBeVisible()
  }
  async cpanel_browse_products() {
    await this.cPanel.click()
  }

  async extensions_browse_products() {
    await this.extensions.click()
  }
}
