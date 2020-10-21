# Create React Component Library

## Overview

## Steps to create a React Library

This is a step by step guide on how to create a custom reusable react component library.

### Initial Set up

1. Install Yarn
2. Install Nodejs
3. Create directory `react-component-library`
4. Inside `react-component-library` folder, run `npm init -y` in the command line

### Configure Rollup and Typescript

1. Install React Packages
    - `yarn add --dev react react-dom @types/react`
    - Inside `package.json`, configure `react` & `react-dom` as **Peer Dependencies**
        ```
        ...
        "peerDependencies": {
            "react": ">=16.8.0",
            "react-dom": ">=16.8.0"
        }
        ...
        ```
2. 




## References
- Create React Component Library
    - [Creating a React Component Library using Rollup, Typescript, Sass and Storybook](https://blog.harveydelaney.com/creating-your-own-react-component-library/)
    - [How to create react component library with typescript, rollup and storybook](https://medium.com/@dennisschneider/how-to-create-a-react-component-library-with-typescript-rollup-js-and-storybook-cc3fe95c9c44)
- Storybook
    - [Add SCSS to Storybook](https://dev.to/mdrahiem/add-less-scss-global-styles-in-storybook-1k50)
- Typescript
    - [Adding CSS Modules to Typescript](https://spin.atomicobject.com/2020/06/22/css-module-typescript/)
    