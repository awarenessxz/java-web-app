# React Component Library

react-gadgets is a React Library which contains a collection of custom reusable React Components, documented with storybook and tested using Jest & React-Testing-Library. The intention is not to re-create the wheel, hence most of the React Component are created using third party libraries and stylesheets.

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

1. `yarn add react-component-library` (adding library as a dependency)
2. Import components
    - `import { Sample } from 'react-component-library';` -- option A
    - `import Sample from 'react-component-library/dist/esm/Sample';` -- option B (direct import)
3. Import Stylesheets
    - `import `

## Development

- **TLDR**
    - [Testing Library Locally](doc/DEVELOPMENT.md#testing-components)
    - [Writing CSS Modules](doc/WRITING_CSS_MODULES.md)
    - [How to create a react-component-library](./doc/CREATE_NEW_LIBRARY.md)

- **Notes**
    - If coding using visual studio, read the documentation for `typescript-plugin-css-modules`

## License

[Apache 2.0](LICENSE)

Important Note: This project does not redistribute third party libraries but identifies their availability. The libraries called by this project are subject to their creator licenses. Remember to consult and comply with all licenses in your uses.

## Release Notes

