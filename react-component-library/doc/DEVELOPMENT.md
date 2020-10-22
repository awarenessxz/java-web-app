# Development



## Testing Components

### Option A) Test Components in Storybook

1. `yarn run storybook` -- run storybook
2. `http://localhost:6006` -- open in internet browser to view storybook locally

### Option B) Link Library to Project to Test Component

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