declare namespace Cypress {
    interface Chainable<Subject> {
        /** Get the element by data-testid attribute */
        getByDataTestId(selector: string): Chainable<any>;
    }
}