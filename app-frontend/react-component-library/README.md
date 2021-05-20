# React Component Library

react-component-library is a React Library which contains a collection of custom reusable React Components, documented with storybook and tested using Jest & React-Testing-Library. The intention is not to re-create the wheel, hence most of the React Component are created using third party libraries and stylesheets.

- [Usage](#usage)
- [Coding Standard](doc/CODING_CONVENTIONS.md)
- [Development](#development)
- [Publishing to NPM Artifactory](doc/PUBLISH_TO_NPM.md)
- [Additional Information](#additional-information)
- [Release Notes](#release-notes)

## Technology Stack

This library is designed using the following technology decisions:

- **React**
- **Typescript** (superset of JavaScript)
- **Eslint & Prettier**
- **Rollup** (javascript module bundler) for bundling the library and publishing to npm.
- **Storybook** (for documenting & developing/testing UI components in isolation).
- **Jest & React-Testing-Library** (for testing).
- **CSS Modules & SASS** (for styling)

## Usage

To use `react-component-libray` in your project, do the following:

1. Adding Library as dependency
    - `yarn add react-component-library`
2. Import components
    - `import { TestComponent } from 'react-component-library';`
3. Import Stylesheets if required
    - `import 'react-component-library/dist/styles/whatever/styles.css>';`

## Development

### Library Development

1. Install the packages
    - `yarn install --ignore-scripts` -- **IMPORTANT** to use this command to prevent `postinstall` script from running.
    - `yarn add --dev PACKAGE_NAME --ignore-scripts`
    - `yarn remove PACKAGE_NAME --ignore-scripts`
2. Run storybook as a playground for developing
    - `yarn run storybook`
3. Run Test
    - `yarn run test`  

### Integrating Library with other applications

Instead of publishing to NPM to test the library, you can follow these steps to test the library locally before publishing.

1. create a project using `npx create-react-app example`
2. Inside `react-component-library` folder
    - use `yarn link` to create a link to the library
    - build the library `yarn run build`
3. Inside `example` project folder
    - run `yarn link react-component-library` -- to link the library to example
    - inside `app.js`, import the component (eg. `import { TestComponent } from 'react-component-library';`) and add the component (`<TestComponent />`)
    - start the application `yarn start`
4. You should receive the following error 
    ```
    Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
    1. You might have mismatching versions of React and the renderer (such as React DOM)
    2. You might be breaking the Rules of Hooks
    3. You might have more than one copy of React in the same app
    See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
    ```
    - **Solution:** This is because the library is using a different version of React from your existing project. To resolve, follow the steps:
        1. In your project (`example`)
            - `cd node_modules/react && yarn link`
            - `cd node_modules/react-dom && yarn link`
        2. In your library (`react-component-library`)
            - `yarn link react`
            - `yarn link react-dom` 
            - `yarn run build`
        3. In your project (`example`)
            - `yarn start`
5. Happy testing

# Additional Information

- **TLDR**
    - [Writing Test cases](doc/WRITING_TEST_CASES.md)
    - [Writing New Component](doc/WRITING_NEW_COMPONENT.md)
    - [Writing CSS Modules](doc/WRITING_CSS_MODULES.md)
    - [Publishing to NPM Artifactory](doc/PUBLISH_TO_NPM.md)
    - [How to create your own react-component-library](doc/CREATE_NEW_LIBRARY.md)
    - [Guide to fix Invalid Hook Error when yarn add ../react-component-library](doc/FIX_INVALID_HOOK_ERROR.md)
    - [Guide to mock api endpoints for fetch in Storybook](doc/MOCK_API_ENDPOINTS_FOR_STORYBOOK.md)
- **Notes**
    - If coding using visual studio, read the documentation for `typescript-plugin-css-modules`
    - Because we are using `postinstall` to remove `node_modules` for `yarn add path/to/react-component-library` to work,
    we will have to use --ignore-scripts whenever we use `yarn install`. This will prevent `postinstall` script from being 
    executed.
        - eg. `yarn install --ignore scripts`
        - eg. `yarn add --dev lodash --ignore-scripts`
- **Future Work**
    - [code-splitting](doc/CREATE_NEW_LIBRARY.md#code-splitting-incomplete---to-work-on)
    - [style-components](doc/CREATE_NEW_LIBRARY.md#style-components)
    - Upgrade node-sass to dart sass
    
## License

[Apache 2.0](LICENSE)

Important Note: This project does not redistribute third party libraries but identifies their availability. The libraries called by this project are subject to their creator licenses. Remember to consult and comply with all licenses in your uses.

## Release Notes
