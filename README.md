## Creating a package.js

- `npm init`;

## Install prettier

- `npm install prettier`;

## Install playwright package

- `npm install @playwright/test`;

## Install all browser for playwright testing

- `npx playwright install`;

## To create our first test, we need to create test folder

## To run our we should run following command

`npx playwright test`

## To run test in all browsers

`npx playwright test --headed --browser=all`

## Specifickly run only run this test

`npx playwright test tests/e2e/add-addon-to-the-cart.spec.ts`

## Create file

`playwright.config`

## Run html report

`npx playwright test --config=playwright.config.ts --project=Chromium --reporter=html`  
`npx playwright show-report`

## Run api tests

`npm run tests:api`
