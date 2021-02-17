import 'cypress-wait-until';

// https://github.com/cypress-io/cypress/issues/7306
Cypress.Commands.add('getSelectorWithWaitUntil', (selector: string, aliasName: string, idx?: number | undefined) => {
    if (idx !== undefined) {
        return cy
            .waitUntil(
                () =>
                    cy
                        .get(selector)
                        .eq(idx)
                        .as(aliasName)
                        .wait(10)
                        .then(($el) => {
                            Cypress.dom.isAttached($el);
                        }),
                { timeout: 1000, interval: 10 },
            )
            .get(`@${aliasName}`);
    }

    return cy
        .waitUntil(
            () =>
                cy
                    .get(selector)
                    .as(aliasName)
                    .wait(10)
                    .then(($el) => {
                        Cypress.dom.isAttached($el);
                    }),
            { timeout: 1000, interval: 10 },
        )
        .get(`@${aliasName}`);
});
