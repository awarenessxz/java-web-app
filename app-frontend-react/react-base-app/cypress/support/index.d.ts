declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
        /** Get the element by data-testid attribute */
        getByDataTestId(selector: string): Chainable<Subject>;
        /** TinyMCE Commands */
        waitForTinyMCELoaded(eventName?: string): Chainable<Promise<null>>;
        getTinyMce(tinyMceId: string): Chainable<any>;
        getTinyMceContent(tinyMceId: string): Chainable<any>;
        setTinyMceContent(tinyMceId: string, content: string): Chainable<any>;
        getSelectorWithWaitUntil(selector: string, aliasName: string, idx?: number | undefined): Chainable<Subject>;
    }
}
