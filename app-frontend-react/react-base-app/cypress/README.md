# Frontend End-to-End Testing using Cypress

Cypress is a javascript End to End Testing Framework.

Guide on End to End Testing using Cypress
- [Folder Structure](#folder-structure)
- [Configuring Cypress](#configuring-cypress)
- [Run End-to-End Test](#run-end-to-end-test)
- [How to write test cases](#how-to-write-test-cases)
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

## Run End-to-End Test

### Development Testing

1. **Start the web application**
2. **Run Cypress** -- (cypress is installed via npm install)
    - `yarn run cypress`
3. **Open the Project inside Cypress**
4. **Run the Test inside Cypress**

### CI/CD Testing

## How to write test cases

All the tests should be written inside the **integration** folder. 

```
it("Writing your first test case", () => {
    // Arrange - setup initial app state
       - visit a web page
       - query for an element    
    // Act - take an action
       - interact with that element
    // Assert - make an assertion
       - make an assertion about page content
});
```

### Tips

- **Arrange**
    - Visit a website --> `cy.visit("http://localhost:8080/");`
    - Query for route
        - `cy.url()`
    - Query for an element
        - `cy.getByDataTestId()` --> Custom Command that queries for `data-testid` attribute in component
        - `cy.find()`
        - `cy.get()`

- **Act**    
    - Click an element --> `cy.get('type').click();`
    - Type into input element -> `cy.get('.input_component').type('something@gmail.com');`

- **Assertions**
    - Implicit Subjects --> `.should()` or `.contains()`
    - Explicit Subject --> `expect()`

- **Seeding Data**
    - Run system commands --> `cy.exec()` 
    - Run code in Node via the plugins file --> `cy.task()`
    - Make HTTP requests --> `cy.request()`

- **More about .get()**
    - **selector strategy**
        1. `cy.get('#id');`
        2. `cy.getByDataTestId('id')'` --> custom command to get `data-testid` attribute
        3. `cy.get('.className');`
        4. `cy.get('input[name='value']');` --> element name + attribute value
    - **command behaviour**
        ```javascript
            // html codes
            <div>
                <div id="group">
                    <input type="text id='name' />
                    <input type="text" />
                </div>  
                <input type="text" />
            </div>
          
            // nested element
            cy.get('#group).get('input'); --> you will expect it to return 2 inputs but this will return 3 inputs.
          
            // Reason being: .get() will always get from the entire document. Below are some ways to query nestede elements:
            // option 1
            cy.get('#group').within(() => {
                cy.get('input');
            });
            // option 2
            cy.get('#group').then((elem) => {
                cy.get('input', {
                    withinSubject: elem,
                });
            });
           ```
    - **working with alias**
        ```javascript
        // working with alias (mocha-context)
        cy.get('#name').as('userName');
        cy.get('@userName').type('typing into input');
        ```    
 
- **For Loop Behaviour**
    - cypress goes through the test and puts all commands in a queue. Once all commands are in a queue, it will execute
    them sequentially. Hence, commands in a loop will not be executing the way you expected. Example: 
    ```
    for(let i=0; i <2; i++) {
        log('-', i);
        cy.then(() => log('*', i));
    }
  
    // you will expect the result to be
    - 0
    * 0
    - 1
    * 1
  
    // but result will be
    - 0
    - 1
    * 0
    * 1
  
    // reason being
    for(let i=0; i <2; i++) {
        log('-', i);                    <-- executed first
        cy.then(() => log('*', i));     <-- added into queue and executed after for loop ended
    }
    ```

## References
- [The No Tears Cypress Setup](https://medium.com/swlh/https-medium-com-daseybold-the-no-tears-cypress-setup-6a8cfc6fbaac?source=post_internal_links---------5------------------)
- [End-to-End Testing Web Apps: The painless way](https://mtlynch.io/painless-web-app-testing/)
- [Run Cypress with a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/)
- [Introducing cy.intercept - Next Generation Network Stubbing in Cypress 6.0](https://www.cypress.io/blog/2020/11/24/introducing-cy-intercept-next-generation-network-stubbing-in-cypress-6-0/)
- [Element Detached from DOM issue](https://github.com/cypress-io/cypress/issues/7306)