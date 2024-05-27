export async function loadHomepage(page) {
  await page.goto('https://store.cpanel.net/index.php')
}

export async function assertTitle(page) {
  await page.waitForSelector('h3')
}
