import './commands/getByDataTestId';

// https://github.com/quasarframework/quasar/issues/2233
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
});
