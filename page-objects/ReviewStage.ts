import { expect, type Locator, type Page } from '@playwright/test';

export class ReviewStage {
  readonly page: Page;
  readonly item: Locator;
  readonly summary: Locator;
  readonly submit: Locator;
  readonly order_summary: Locator;
  readonly checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.item = page.locator('span[class=item-title]').first()
    this.summary = page.locator('div[class=total-due-today]')
  
    this.order_summary = page.locator('div[class=order-summary]');
    this.checkout = page.locator('a[id=checkout]')

  }


  async product_item( value: string) {
    expect( this.item).toContainText(value);
  }

  async checkout_button() {
    await this.checkout.click();
  }

  async review_summary(text: string) {
     expect(this.summary).toContainText(text)


  }



}