declare namespace Cypress {
    interface Chainable<Subject> {
        /** Get the element by data-testid attribute */
        getByDataTestId(selector: string): Chainable<any>;
        /** TinyMCE Commands */
        waitForTinyMCELoaded(): Chainable<Promise<null>>;
        getTinyMce(tinyMceId: string): Chainable<any>;
        getTinyMceContent(tinyMceId: string): Chainable<any>;
        setTinyMceContent(tinyMceId: string, content: string): Chainable<string>;
    }
}