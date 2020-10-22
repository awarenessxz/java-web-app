# Create React Component Library

## Overview

- [Configure Rollup & Typescript](#configure-rollup-and-typescript)
- [Configure Jest & Testing Library](#configure-jest-and-react-testing-library)
- [Configure ESLint & Prettier](#configure-eslint-and-prettier)

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

### Configure ESLint and Prettier

1. Install ESLint and Prettier Packages
    - `yarn add --dev eslint eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks`


### Configure Jest and React-Testing-Library

1. Install Jest and React Testing Library Packages
    - `yarn add --dev jest ts-jest @types/jest identity-obj-proxy @testing-library/react @testing-library/jest-dom`
        - `identity-obj-proxy` -- required for mocking css modules
2. Create configuration file `jest.config.js` in root directory

    ```
    /* jest.config.js */

    module.exports = {
        roots: ["./src"],
        setupFilesAfterEnv: ["../setup/jest.setup.ts"],
        moduleFileExtensions: ["ts", "tsx", "js"],
        collectCoverage: true,
        collectCoverageFrom: [
            '<rootDir>/src/components/**/*.{ts,tsx}',
            '!<rootDir>/src/components/**/*.stories.{ts,tsx}'
        ],
       coverageDirectory: './coverage',
        testPathIgnorePatterns: ["node_modules/"],
        transform: {
            "^.+\\.tsx?$": "ts-jest"
        },
        testMatch: ["**/*.test.(ts|tsx)"],
        moduleNameMapper: {
            // Mocks out all these file formats when tests are run
            "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
                "identity-obj-proxy",
            "\\.(css|less|scss|sass)$": "identity-obj-proxy"
        }
    };
    ```

3. Create jest setup file `setup/jest.setup.ts`

    ```
    /* setup/jest.setup.ts */

    import "@testing-library/jest-dom";
    ```

4. Exclude test files from being bundle when building

    ```
    /* tsconfig.json */

    ...
    "exclude": [
        "node_modules",
        "dist",
        "src/**/*.stories.tsx",
        "src/**/*.test.tsx" // add this line
    ]
    ...
    ```

5. Add scripts in `package.json` to run test

    ```
    /* package.json */

    ...
    "scripts": {
            ...
            "test": "jest",
            "test:watch": "jest --watch",
            ...
    }
    ...
    ```

## References
- Create React Component Library
    - [Creating a React Component Library using Rollup, Typescript, Sass and Storybook](https://blog.harveydelaney.com/creating-your-own-react-component-library/)
    - [How to create react component library with typescript, rollup and storybook](https://medium.com/@dennisschneider/how-to-create-a-react-component-library-with-typescript-rollup-js-and-storybook-cc3fe95c9c44)
- Storybook
    - [Add SCSS to Storybook](https://dev.to/mdrahiem/add-less-scss-global-styles-in-storybook-1k50)
- Typescript
    - [Adding CSS Modules to Typescript](https://spin.atomicobject.com/2020/06/22/css-module-typescript/)
- ESLint
    - [Eslint for Typescript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)