# Create React Component Library

## Table of Content

- [Steps to create React Library](#steps-to-create-a-react-library)
    - [Configure Rollup & Typescript](#configure-rollup-and-typescript)
    - [Configure Storybook v6](#configure-storybook)
    - [Configure CSS](#configure-css)
        - [CSS Modules](#css-modules-with-sass)
        - [Style Components](#style-components)
    - [Configure Jest & Testing Library](#configure-jest-and-react-testing-library)
    - [Configure ESLint & Prettier](#configure-eslint-and-prettier)
- [Additional Configuration](#additional-configuration)
    - [Code Splitting](#code-splitting-optional)
- [References](#references)

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
2. Install Rollup Packages
    - `yarn add --dev rollup rollup-plugin-typescript2 @rollup/plugin-commonjs @rollup/plugin-node-resolve rollup-plugin-peer-deps-external rollup-plugin-postcss node-sass`
3. Set up the project with the following structure and files
    ```
    root
    └── src
        └── components                      
              ├── TestComponent.tsx         # React Components
              ├── TestComponent.types.ts    # Type Definition 
              └── TestComponent.scss        # SCSS
        └── index.ts                        # main entry file
    ├── package.json                  
    ├── rollup.config.js                    
    └── tsconfig.json
    ```
4. Inside `TestComponent.tsx`, add the following
    ```
    import React from "react";
    import { TestComponentProps } from "./TestComponent.types";
    import "./TestComponent.scss";
    
    const TestComponent: React.FC<TestComponentProps> = ({ theme }) => (
      <div
        data-testid="test-component"
        className={`test-component test-component-${theme}`}
      >
        <h1 className="heading">I'm the test component</h1>
        <h2>Made with love by Harvey</h2>
      </div>
    );
    
    export default TestComponent;
    ```
5. Inside `TestComponent.scss`, add the following
    ```
    .test-component {
        background-color: white;
        border: 1px solid black;
        padding: 16px;
        width: 360px;
        text-align: center;
        
        .heading {
            font-size: 64px;
        }
    
        &.test-component-secondary {
            background-color: black;
            color: white;
        }
    }
    ```
6. Inside `TestComponent.types.ts`, add the following
    ```
    export interface TestComponentProps {
      theme: "primary" | "secondary";
    }
    ```
7. Inside `index.ts`, add the following
    ```
    import TestComponent from "./TestComponent/TestComponent";
    export { TestComponent };
    ```
8. Inside `tsconfig.json`, add the following
    ```
    {
      "compilerOptions": {
        "declaration": true,
        "declarationDir": "dist",
        "module": "esnext",
        "target": "es5",
        "lib": ["es6", "dom", "es2016", "es2017"],
        "sourceMap": true,
        "jsx": "react",
        "moduleResolution": "node",
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules","dist"]
    }
    ```
9. Inside `package.json`, add the following
    ```
    ...
    "main": "dist/index.js",
    "module": "dist/index.es.js",
    "source": "src/index.ts",
    "files": ["dist"],
    "scripts": {
        "build": "rollup -c"
    }
    ...
    ```
10. Inside `rollup.config.js`, add the following
    ```
    import peerDepsExternal from "rollup-plugin-peer-deps-external";
    import resolve from "@rollup/plugin-node-resolve";
    import commonjs from "@rollup/plugin-commonjs";
    import typescript from "rollup-plugin-typescript2";
    import postcss from "rollup-plugin-postcss";
    
    const packageJson = require("./package.json");
    
    export default {
      input: "src/index.ts",
      output: [
        {
          file: packageJson.main,
          format: "cjs",
          sourcemap: true
        },
        {
          file: packageJson.module,
          format: "esm",
          sourcemap: true
        }
      ],
      plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        postcss()
      ]
    };
    ```
11. Test if project can build
    - `yarn run build`

### Configure Storybook

1. Init Storybook
    - `npx sb init` 
    - Make sure the packages `@babel/core` & `babel-loader` & `react-is` are installed
2. Install Dependencies
    - `yarn add --dev @storybook/preset-scss style-loader css-loader sass-loader` (to support SCSS)
3. Update `./storybook/main.js`
    ```
    module.exports = {
        stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
        addons: [
            '@storybook/preset-scss',
            '@storybook/addon-links',
            '@storybook/addon-essentials',
        ],
    };
    ```
3. Update `typescript.json`
    ```$xslt
    ...
    "exclude": [
        "node_modules", 
        "dist", 
        "src/**/*.stories.tsx" // add this line 
    ]
    ...
    ```
4. To view the storybook locally
    - `yarn run storybook`
    - For the rest of the configuration, refer to the project & [official documentations](https://www.learnstorybook.com/)

### Configure CSS

#### CSS Modules with SASS

CSS Modules allows us to locally scoped css for each component. Some rules to follow
- Use the convention to name css modules as `*.module.scss`

To set up CSS Modules with SASS, follow these steps
1. To build library with CSS Modules, configure the following inside `rollup.config.js`
    ```
    ...
    plugins: [
       peerDepsExternal(),
       postcss({
           modules: true,
           extensions: ['module.scss'],
           use: ['sass'],
       }),
       ...
    ]
    ...
    ```
2. For CSS Modules to work in Storybook, configure the following inside `.storybook/main.js`
    ```
    ...
    addons: [
        {
            name: '@storybook/preset-scss',
            options: {
                cssLoaderOptions: {
                    modules: true,
                },
            },
        },
        ...
    ]
    ...
    ```

#### Style Components

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

## Additional Configuration

### Code-Splitting [Optional]

This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. **TLDR:** Code Splitting allows user to direct import the components that they need from the library instead of all the components. This is a popular approach as it reduces the amount of javascript codes sent to the client. 

1. Update `rollup.config.js` to support different formats of output. We are using `dir` instead of `files` as there will be more than one bundle for each format.
    ```$xslt
    ...
    input: packageJson.source,
    output: [
        {
            dir: packageJson.target.cjs,
            format: 'cjs',
            sourcemap: true,
        },
        {
            dir: packageJson.target.esm,
            format: 'esm',
            sourcemap: true,
        },
    ],
    ...
    ```
2. Update `package.json`. If a tool can support `ECMAScript`, it'll use `module` else it'll use `main`. 
    ```$$xslt
    ...
    "main": "dist/cjs/index.js",
    "module": "dist/esm/index.js",
    "source": {
        "index": "./src/index.js",
        "TestComponent": "./src/components/TestComponent/TestComponent.tsx"
    },
    "target": {
        "cjs": "dist/cjs",
        "esm": "dist/esm"
    },
    "files": [
        "dist/cjs/*",
        "dist/esm/*"
    ],
    ...
    ```
3. Build the library `yarn run build` and you should see more than one bundle.js generated.

4. When using the library, 
    - `import { Sample } from 'react-gadgets';` -- import all components inside the library
    - `import Sample from 'react-gadgets/esm/sample';` -- import only sample component (direct import)

## References
- Create React Component Library
    - [Creating a React Component Library using Rollup, Typescript, Sass and Storybook](https://blog.harveydelaney.com/creating-your-own-react-component-library/)
    - [How to create react component library with typescript, rollup and storybook](https://medium.com/@dennisschneider/how-to-create-a-react-component-library-with-typescript-rollup-js-and-storybook-cc3fe95c9c44)
- Storybook
    - [Add SCSS to Storybook](https://dev.to/mdrahiem/add-less-scss-global-styles-in-storybook-1k50)
- Rollup + Typescript + Stylesheets
    - [Adding CSS Modules to Typescript](https://spin.atomicobject.com/2020/06/22/css-module-typescript/)
    - [Bundle Libraries With SCSS and CSS Modules Using Rollup](https://florian.ec/blog/rollup-scss-css-modules/)
- ESLint
    - [Eslint for Typescript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)
    - [Eslint Tslint Configuration for excluded files](https://stackoverflow.com/questions/60822280/eslint-tslint-config-help-excluding-files)
- Scripts
    - [Updating package.json](https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js)
    - [How can I use an es6 import in node](https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node)
    - [Change nodejs console log colour](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)
    