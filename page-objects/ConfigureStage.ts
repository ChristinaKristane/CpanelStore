import { expect, type Locator, type Page } from '@playwright/test';

export class ConfigureStage {
  readonly page: Page;
  readonly order: Locator;
  readonly ipInput: Locator;
  readonly submit: Locator;
  readonly addon: Locator;
  readonly product: Locator;

  constructor(page: Page) {
    this.page = page;
    this.order = page.locator('a', { hasText: 'Order Now' })
    this.ipInput = page.locator('input#customfield11')
    this.product = page.locator('div[id=product3-price]')

    this.submit =  page.locator('button[type=submit]', { hasText: 'Continue' })
  
    this.addon = page.locator('div[class=panel-add]', { hasText: 'Add to Cart' })
  }

  async order_now(order: number) {
    await this.order.nth(order).click();
  }

  async continue_button() {
    await this.submit.click();
  }
  


  async fill_ip(ip: string) {
    await this.ipInput.fill(ip)
    await this.page.keyboard.press('Enter')
  }

  async available_addod(addon: number) {
   await this.addon.nth(addon).click();
  }

}