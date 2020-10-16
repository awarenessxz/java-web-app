# Quick overview on creating your own library

This is a quick guide to create a custom reusable react library using:
- Rollup
- Sass
- React

Additional Features includes:
- Storybook
- Jest & React-Testing-Library

## Step by Step Guide

### Step 1. Initial Set up

1. **Install Yarn**
2. **Install Nodejs**
3. **Create directory `react-component-library`**
4. **Initialize Node Project**
    - inside `react-component-library` folder, run `npm init -y` in the command line

### Step 2. Configure Rollup

1. **Install React Packages**
    - `yarn add --dev react react-dom @types/react prop-types`
        - Go to `package.json` and add `react` & `react-dom` as `Peer Dependencies`. Set the version to greater than 16.8 as react hooks will be used
            ```$xslt
            ...
            "peerDependencies": {
                "react": ">=16.8.0"
                "react-dom": ">=16.8.0"
            }
            ...
            ```
2. **Install Rollup related packages**
    - `yarn add --dev rollup @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-node-resolve rollup-plugin-peer-deps-external`
3. **Create a React Component**
    - Inside `src` folder, add the TestComponent (refer to the source)
4. **Create the entry point for library**
    - Inside `src` folder, create `index.ts`. Add the following content inside
        ```$xslt
        export { default as TestComponent } from './TestComponent/TestComponent';
        ```
5. **Update Package.json**
    ```$xslt
    ...
    "main": "dist/index.js",
    "source": "src/index.js",
    "files": [
       "dist"
    ],
    "scripts": {
        "build": "rollup -c"
    }
    ...
    ```
6. **Add Typescript Configuration**
    - create a file `tsconfig.json` inside root folder and add the following content:
        ```$xslt
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
          "exclude": [
            "node_modules",
            "dist"
          ]
        }
        ```
7. **Add Rollup Configuration**
    - create a file `rollup.config.js` inside root folder and add the following content:
        ```$xslt
        import peerDepsExternal from 'rollup-plugin-peer-deps-external';
        import resolve from '@rollup/plugin-node-resolve';
        import typescript from "rollup-plugin-typescript2";
        import commonjs from '@rollup/plugin-commonjs';
        import packageJson from './package.json';
        import path from 'path';
        
        export default {
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
            plugins: [
                peerDepsExternal(),
                typescript({ useTsconfigDeclarationDir: true }),
                resolve({
                    extensions: ['.ts', '.tsx', '.es6', '.es', '.mjs', '.node', '.json'],
                }),
                commonjs()
            ],
        };
        ```
   - **rollup-plugin-peer-deps-external** -- preventing Rollup from bundling the peer dependencies we've defined in package.json
   - **@rollup/plugin-node-resolve** -- efficiently bundles third party dependencies we've installed in node_modules
   - **@rollup/plugin-commonjs** -- enables transpilation into CommonJS (CJS) format
   - **rollup-plugin-typescript2** -- transpiles our TypeScript code into JavaScript. This plugin will use all the settings we have set in tsconfig.json. We set `"useTsconfigDeclarationDir": true` so that it outputs the .d.ts files in the directory specified by in tsconfig.json
8. **Test if project can build**
    - `yarn run build`

### Step 3: Configure Storybook

1. Add Storybook
    - `npx -p @storybook/cli sb init --type react`
    - Make sure the packages `@babel/core` & `babel-loader` are installed
2. Add Storybook-addons
    - `yarn add --dev @storybook/addon-storysource @storybook/addon-console @storybook/addon-links @storybook/addon-essentials`
3. Update `./storybook/main.js`
    ```$xslt
    module.exports = {
      "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(ts|tsx)"
      ],
      addons: [
        '@storybook/addon-links',
        '@storybook/addon-storysource',
        "@storybook/addon-essentials"
      ],
      typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
          shouldExtractLiteralValuesFromEnum: true,
          propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
      }
    };
    ```
4. Add configuration for addon. In `.storybook/preview.js`
    ```$xslt
    ```
5. Update `tsconfig.json`
    ```$xslt
    ...
    "exclude": [
        ...
        "src/**/*.stories.tsx",
        ...
    ]
    ...
    ```
6. To view the storybook locally
    - `yarn run storybook`
7. For the rest of the configuration, refer to the project & [official documentations](https://www.learnstorybook.com/)
    - refer to the next part on css configuration for storybook

### Step 4:  Configure CSS Style (SASS + CSS Modules)

1. **Install packages**
    - `yarn add --dev rollup-plugin-postcss node-sass`
2. **Install packages required for Storybook**
    - `yarn add --dev sass-loader` 
3. **Configure rollup (`rollup.config.js`)**
    ```$xslt
    import postcss from 'rollup-plugin-postcss';
    ...
    plugins: [
        peerDepsExternal(),
        postcss({
           modules: true,
           extensions: ['css', 'scss'],
            use: [
                [
                    'sass',
                    {
                        includePaths: [path.resolve('node_modules')],
                    },
                ],
            ],
        }),
        ...
    ],
    ...
    ```
4. **Customize Storybook’s webpack to add SASS & CSS module support. Inside `.storybook/main.js`**
    ```$xslt
    const path = require('path');
    ...
    module.exports = {
        ...
        webpackFinal: async config => {
            config.module.rules.push({
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
                include: path.resolve(__dirname, '../'),
            });
    
            return config;
        },
        ...
    };
    ```

### Step 5: Configure Jest & React-Testing-Library

1. Install Jest Packages
    - `yarn add --dev jest babel-jest @types/jest react-test-renderer`
2. Install react-testing-library Packages
    - `yarn add --dev @testing-library/react @testing-library/jest-dom`
3. Install other Packages
    - `yarn add --dev identity-obj-proxy` -- required for mocking css modules
4. Create configuration file `jest.config.js`
    ```$xslt
    module.exports = {
       rootDir: './src',
       setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
       verbose: true,
       moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
       collectCoverage: true,
       collectCoverageFrom: [
           '<rootDir>/**/*.{js,jsx}',
           '!<rootDir>/**/*.stories.js',
           '!<rootDir>/index.js',
       ],
       coverageDirectory: '../coverage',
       testPathIgnorePatterns: ['node_modules/'],
       testMatch: ['**/*.test.(js|jsx)'],
       transform: {
           '^.+\\.[t|j]sx?$': 'babel-jest',
           '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
       },
       moduleNameMapper: {
           // Mocks out all these file formats when tests are run
           '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
               'identity-obj-proxy',
           '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
       },
    };
    ```
5. Create jest setup file `src/tests/jest.setup.js`
    ```$xslt
    import '@testing-library/jest-dom';
    ```
6. Inside `package.json`, add the test script
    ```$xslt
    ...
    "scripts": {
        "test": "jest"
        "test:watch": "jest --watch"
    }
    ...
    ```
7. Update `rollup.config.js`
   ```$xslt
   plugins: [
       ...
       babel({
           ...
           exclude: ['node_modules/**', 'dist', 'src/**/*.test.js*', 'src/**/*.stories.*'],
           ...
       }),
       ...
   ],
       ```

## 3. Additional Configuration

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
        "sample": "./src/components/Sample/Sample.jsx"
        "samplewithsub": "./src/components/SampleWithSub/SampleWithSub.jsx"
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

### Create Component using Template Script [Optional]

This script was designed by 

    
## 4. Configuration Issues that you might face

These are possible problems you might faced when trying to setup the configuration for a custom react library

1. Jest fails to run due to misconfiguration (when running `yarn run test`)

    - Details: `Jest encountered an unexpected token. This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.`
    - Solution: create babel.config.js (add @babel/preset-react)
    - Reference: [how to solve jest error with create-react-app](https://medium.com/@audreyhal/how-to-solve-jest-error-with-create-react-app-part-1-80f33aa1661a#:~:text=This%20usually%20means%20that%20you,Here's%20what%20you%20can%20do%3A&text=babelrc%20file%20in%20my%20root%20folder.)

2. Rollup is unable to resolve import (when running `yarn run build`)
    - Details: `[!] Error: Could not resolve './components/0-Sample/Sample' from src\index.js.`
    - Solution: add file extension to resolve
    - Reference: [Rollup Issue with importing jsx files](https://github.com/rollup/rollup/issues/1052)

3. Jest fails to run when components imports css modules
    - Details:
        ````$xslt
        C:\..\react-gadgets\src\components\Sample\Sample.scss:1
        ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){.test_component {
                                                                                                     ^
        
        SyntaxError: Unexpected token '.'
    
          1 | import React, { useState } from 'react';
          2 | import PropTypes from 'prop-types';
        > 3 | import styles from './Sample.scss';
            | ^
          4 |
    
          at Runtime.createScriptFromCode (../node_modules/jest-runtime/build/index.js:1258:14)
          at Object.<anonymous> (components/Sample/Sample.jsx:3:1)
        ````
    - Solution: Add `moduleNameMapper` in `jest.config.js`
    - Reference: [Jest doesn't works with JSX which imports CSS](https://github.com/facebook/jest/issues/3094)

## 5. References

The links can be found in the main [README.md](../README.md#references)
