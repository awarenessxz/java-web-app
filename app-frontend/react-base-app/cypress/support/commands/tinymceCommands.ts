/*
 * Referenced from
 * https://github.com/tracim/tracim/issues/1327
 * https://github.com/tracim/tracim/blob/develop/functionnal_tests/cypress/support/commands.js#L108
 * https://github.com/tracim/tracim/issues/2041
 */

Cypress.Commands.add('waitForTinyMCELoaded', (eventName = 'tinymceLoaded'): void => {
    cy.document().then(
        ($doc): Promise<null> => {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
            return new Cypress.Promise((resolve) => {
                // Cypress will wait for this Promise to resolve
                const onTinyMceLoaded = (): void => {
                    $doc.removeEventListener(eventName, onTinyMceLoaded); // cleanup
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    resolve(); // resolve and allow Cypress to continue
                };
                $doc.addEventListener(eventName, onTinyMceLoaded);
            });
        },
    );
});

/*
 * Referenced from
 * https://github.com/ForeachOS/cypress-tinymce
 */

Cypress.Commands.add('getTinyMce', (tinyMceId: string) => {
    cy.window().then((win) => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
        return win.tinymce.editors[tinyMceId];
    });
});

Cypress.Commands.add('setTinyMceContent', (tinyMceId: string, content: string) => {
    cy.window().then((win) => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        const editor = win.tinymce.editors[tinyMceId];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        editor.setContent(content);
    });
});

Cypress.Commands.add('getTinyMceContent', (tinyMceId: string) => {
    cy.window().then((win) => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        const editor = win.tinymce.editors[tinyMceId];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
        return editor.getContent();
    });
});
