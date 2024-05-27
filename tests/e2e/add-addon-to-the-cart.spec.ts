import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ConfigureStage } from '../../page-objects/ConfigureStage'
import { ReviewStage } from '../../page-objects/ReviewStage'
import { CheckoutStage } from '../../page-objects/CheckoutStage'

test.describe('Addon product', () => {
  let homePage: HomePage

  const ip = '2.2.2.2'
  const cpanel = 'cPanel Solo® Cloud (1 Account)'

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    homePage.visit()
    homePage.page_load()
  })

  test.skip('Product price with added addon is the same on Configure and Checkout stage @smoke', async ({
    //Failed due to attached issue "Bug Description_ Incorrect Subtotal Due Today Amount.txt"
    page,
  }) => {
    const configure_stage = new ConfigureStage(page)
    const review_stage = new ReviewStage(page)
    const checkout_stage = new CheckoutStage(page)
    await test.step(
      'Given I navigate as "user" to cPanel and I click on "Browse products" on cPanel Licenses',
      async () => {
        await homePage.cpanel_browse_products()
      }
    )

    await test.step('And I verify that Total amount ', async () => {
      await expect(configure_stage.product).toContainText('$17.49 USD')
    })

    await test.step(
      'When I click "Order Now" on cPanel Solo® Cloud',
      async () => {
        await configure_stage.order_now(0)
      }
    )

    await test.step(
      'And I enter "2.2.2.2" as an IP address in the Additional Information',
      async () => {
        await configure_stage.fill_ip(ip)
      }
    )

    await test.step(
      'And I add "Available Addons" by clicking on "Add to Cart" button',
      async () => {
        await configure_stage.available_addod(1)
      }
    )
    await test.step('And I click to "Continue" button', async () => {
      await configure_stage.continue_button()
    })

    await test.step('And I click on "Checkout" button', async () => {
      await review_stage.checkout.click()
    })
    await test.step(
      'Then I verify that Produc/Options is contain correct monthly price for cPanel Solo® Cloud (1 Account)',
      async () => {
        await expect(checkout_stage.table).toContainText('$17.49 USD')
        await expect(checkout_stage.table).toContainText(cpanel)
      }
    )

    await test.step(
      'And I verify that subtotal amount is $2.82 USD Total Due Today',
      async () => {
        await expect(checkout_stage.subtotal).toContainText('$2.82')
      }
    )
  })

  test.only('Product without addon has added to the cart successfully and has correct subtotal price @regression', async ({
    page,
  }) => {
    const configure_stage = new ConfigureStage(page)
    const review_stage = new ReviewStage(page)
    const checkout_stage = new CheckoutStage(page)
    const total_amount = '$2.82 USD'

    await test.step(
      'Given I navigate as "user" to cPanel and I click on "Browse products" on cPanel Licenses',
      async () => {
        await homePage.cpanel_browse_products()
      }
    )

    await test.step(
      'When I click "Order Now" on cPanel Solo® Cloud',
      async () => {
        await configure_stage.order_now(0)
      }
    )

    await test.step(
      'And I enter "2.2.2.2" as an IP address in the Additional Information',
      async () => {
        await configure_stage.fill_ip(ip)
      }
    )

    await test.step('And I click to "Continue" button', async () => {
      await configure_stage.continue_button()
    })

    await test.step(
      'Then I verify that products are present on summary in review stage and contain $2.82 USD  USD Total Due Today before I go to the checkout stage',
      async () => {
        await review_stage.review_summary(total_amount)

        await expect(review_stage.order_summary).toContainText(total_amount)
        await expect(review_stage.order_summary).toContainText(cpanel)
      }
    )

    await test.step('And I click on "Checkout" button', async () => {
      await review_stage.checkout.click()
    })
    await test.step(
      'Then I verify that table on Checkout stage is contain IP adress "2.2.2.2"',
      async () => {
        await expect(checkout_stage.table).toContainText(ip)
      }
    )

    await test.step(
      'And I verify that table on Checkout stage is contain added product',
      async () => {
        await expect(checkout_stage.table).toContainText(cpanel)
      }
    )

    await test.step(
      'Then I verify that subtotal amount is $2.82 USD Total Due Today',
      async () => {
        await expect(checkout_stage.subtotal).toContainText(total_amount)
      }
    )
    await test.step(
      'When I enter first name into Personal information',
      async () => {
        await checkout_stage.fill_first_name('Galtsova Krystyna')
      }
    )
    await test.step(
      'Then I verify that Personal information and Billing Address sections are visible',
      async () => {
        await expect(checkout_stage.first_name).toHaveValue('Galtsova Krystyna')
        await expect(checkout_stage.company_name.isVisible()).toBeTruthy()
      }
    )
    await test.step(
      'And I verify that "Complete order" button is disabled',
      async () => {
        await expect(checkout_stage.complete.isDisabled()).toBeTruthy()
      }
    )
  })
})
