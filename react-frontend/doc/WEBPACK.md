# Overview on webpack configuration

## Configuration Files
- `tsconfig.json`: config for type checking (Note that we will be using babel for code transpilation although we can do it here too)
- `.babelrc`: config for code transpilation
- `wepack.config.js`: config for webpack to bundle javascript files
- `.eslintrc`: config for lint
- `package.json`: npm dependency manager

## Babel & Webpack Related
- `@babel/core` - transforms es6 code to es5
- `@babel/plugin-transform-runtime` and `@babel/runtime` - plugins to allow us to use `aysnc` and `await` Javascript features
- `babel-loader` - webpack helper to transpile code, given the preset (using babel-loader instead of ts-loader to transpile typescript files)
    - `@babel/preset-env` - preset which helps babel to transform es6, es7, es8 code to es5
    - `@babel/preset-react` - preset which transform jsx to javascript (es5)
    - `@babel/preset-typescript` - enables Babel to transform Typescript code into Javascript
- `css-loader` - load and bundle css into one file
- `style-loader` - add all the styles inside the style tag to the document

## Eslint
- `eslint` - core Eslint library
- `eslint-plugin-react` - contains standard linting rules for React code
- `eslint-plugin-react-hooks` - contains linting rules for React hooks code
- `eslint-config-airbnb` - contains linting rules by airbnb
- `prettier` - core prettier library
- `eslint-config-prettier` - turns off all rules that are unnecessary or might conflict with Prettier 
- `eslint-plugin-prettier` - runs prettier as an eslint rule
- `@typescript-eslint/parser` - allows typescript code to be linted
- `@typescript-eslint/eslint-plugin` - contains standard linting rules for Typescript code

# References
- [Set up webpack 5 from scratch](https://www.taniarascia.com/how-to-use-webpack/)
- [creating react and typescript apps with webpack](https://www.carlrippon.com/creating-react-and-typescript-apps-with-webpack/)
- [redux with typescript](https://medium.com/@ksholla20/react-redux-with-typescript-ad7266896a9b)
- [How to setup and use css modules in react with webpack](https://medium.com/@michaelceber/how-to-setup-and-use-css-modules-in-react-with-webpack-7f512b946ae0)
- Eslint
    - [Using Eslint and Prettier in Typescript project](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)
    - [Using Airbnb Eslint config when moving to typescript](https://medium.com/@myylow/how-to-keep-the-airbnb-eslint-config-when-moving-to-typescript-1abb26adb5c6)
- [How to set up Webpack 5, ES6 with ESLint, PostCSS with Stylelint, CSSNANO and more!](https://jontorrado.medium.com/working-with-webpack-4-es6-postcss-with-preset-env-and-more-93b3d77db7b2)
- [use webpack 5](https://github.com/webpack/webpackjs.org/pull/3963)