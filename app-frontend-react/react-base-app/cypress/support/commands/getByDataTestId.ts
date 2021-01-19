Cypress.Commands.add('getByDataTestId', (testId: string, ...args) => {
    return cy.get(`[data-testid='${testId}']`, ...args);
});
