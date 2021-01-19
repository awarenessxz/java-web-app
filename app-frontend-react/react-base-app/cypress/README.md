# Frontend End-to-End Testing using Cypress

Cypress is a javascript End to End Testing Framework.

Guide on End to End Testing using Cypress
- [Folder Structure](#folder-structure)
- [Configuring Cypress](#configuring-cypress)
- [How to write test cases](#how-to-write-test-cases)
- [Run End-to-End Test](#run-end-to-end-test)
- [References](#references)

## Folder Structure

```bash
root
├── fixtures      # where you store static data used throughout your test. Eg. Test data or mock responses
├── integration   # where all your tests will live
├── plugins       # Cypress has a node process that can be used to extend some of its functionality
└── support       # Out of the box, Cypress provides support/index.js file that will be run before every spec file.
                    It can be used for several things such as global beforeEach hook, overrides, and setting custom 
                    commands.
```

## Configuring Cypress

To run the interactive `test-runner` of Cypress, we will have to first install Cypress. Download instructions can be
found [here](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements). Below are 
some of the important things to take note:

1. **npm install cypress**
    - We installed this NPM package (`npm install cypress`) because we are writing our tests in typescript. 
    - The cypress binary will not be installed!! Refer to `.npmrc` for the configuration.
2. **Cypress Test Runner**
    - When testing in development, we will be using the installed version of Cypress to test.
    - When testing in CI/CD, we will be using the dockerized version of Cypress to run headless test.
3. **Writing Your Tests in Typescript**
    - By default, Cypress expects your tests to be written in Javascript. To write our tests in Typescript, we need to
    take advantage of the plugin capability of Cypress. We are going to add a file pre-processor that will transpile
    any Typescript files we have to Javascript before running the tests.
        - `yarn add --dev @cypress/webpack-preprocessor ts-loader`
    - We tell Cypress to pre-process our test files with webpack and our webpack config via `preprocess.js` inside the
    plugin directory.

## How to write test cases

All the tests should be written inside the **integration** folder. 

- **Basic Commands**
    - Visit a website --> `cy.visit("http://localhost:8080/");`
    - Query for an element --> `cy.contains('value');`
    - Click an element --> `cy.contains('type').click();`
    - Make an assertion using [.should()](https://docs.cypress.io/api/commands/should.html#Arguments) --> `cy.url().should('include', '/commands/actions');`

- **Assertions**
    - Implicit Subjects --> `.should()` or `.and()`
    - Explicit Subject --> `expect`

- **Seeding Data**
    - Run system commands --> `cy.exec()` 
    - Run code in Node via the plugins file --> `cy.task()`
    - Make HTTP requests --> `cy.request()`

## Run End-to-End Test

### Development Testing

1. **Install Cypress**
2. **Run Cypress**
    - `cypress run`
3. **Open the Project inside Cypress**
4. **Run the Test inside Cypress**

### CI/CD Testing

## References
- [The No Tears Cypress Setup](https://medium.com/swlh/https-medium-com-daseybold-the-no-tears-cypress-setup-6a8cfc6fbaac?source=post_internal_links---------5------------------)
- [End-to-End Testing Web Apps: The painless way](https://mtlynch.io/painless-web-app-testing/)
- [Run Cypress with a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/)
- [Introducing cy.intercept - Next Generation Network Stubbing in Cypress 6.0](https://www.cypress.io/blog/2020/11/24/introducing-cy-intercept-next-generation-network-stubbing-in-cypress-6-0/)
