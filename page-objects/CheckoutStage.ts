import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutStage {
  readonly page: Page;
  readonly table: Locator;
  readonly subtotal: Locator;
  readonly complete: Locator;
  readonly first_name: Locator;
  readonly company_name: Locator;
  readonly name_input: Locator;


  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('tbody')
    this.subtotal = page.locator('div[class=ml-auto]').first()
    this.complete = page.locator('button[id=btnCompleteOrder]', {hasText: 'Complete Order' });
    this.first_name = page.getByPlaceholder('First Name')
    this.company_name = page.getByPlaceholder('Company Name (Optional)')
    this.name_input = page.locator('input#firstname')

  }

  async complete_order() {
    await this.complete.click();
  }

  async fill_first_name(name: string) {
    await this.first_name.fill(name)
    await this.page.keyboard.press('Enter')
  }

}