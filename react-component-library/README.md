# React Component Library

react-component-library is a React Library which contains a collection of custom reusable React Components, documented with storybook and tested using Jest & React-Testing-Library. The intention is not to re-create the wheel, hence most of the React Component are created using third party libraries and stylesheets.

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

- **TLDR**
    - [Testing Library Locally](doc/DEVELOPMENT.md#testing-components)
    - [Writing New Component](doc/NEW_COMPONENT.md)
    - [Writing CSS Modules](doc/WRITING_CSS_MODULES.md)
    - [Publishing to NPM Artifactory](doc/PUBLISH_TO_NPM.md)
    - [How to create your own react-component-library](./doc/CREATE_NEW_LIBRARY.md)
- **Notes**
    - If coding using visual studio, read the documentation for `typescript-plugin-css-modules`
- **Future Work**
    - [code-splitting](doc/CREATE_NEW_LIBRARY.md#code-splitting-incomplete---to-work-on)
    - [style-components](doc/CREATE_NEW_LIBRARY.md#style-components)

## License

[Apache 2.0](LICENSE)

Important Note: This project does not redistribute third party libraries but identifies their availability. The libraries called by this project are subject to their creator licenses. Remember to consult and comply with all licenses in your uses.

## Release Notes
