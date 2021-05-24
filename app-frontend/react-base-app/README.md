# React Frontend (Main App)

Simple React Web Application Template built with typescript,webpack,react

## Technology Stack

- **React**: Core Javascript Framework for building user interfaces
- **Redux**: State management
- **Webpack & Babel**: Bundling and Transpiling of Javascript codes
- **Typescript**: Type checking
- **Elastic UI / react-component-library**: UI Libraries
- **Eslint / Prettier**: Code Styles

## Folder Structure

```
root
├── config              
    ├── nginx               # for deployment
    └── webpack             # webpack configuration files
├── cypress                 # testing via cypress
├── doc                     # documentations
└── src
    ├── assets              # images / global css / javascript files
    ├── modules
        ├── module-name
            ├── component   # react components
            ├── redux       # state management
            ├── styles      # css modules with SASS
            └── utils       # helper functions
        .
        .
        .
    ├── redux               # main redux store (state management)
    ├── types               # type definitions 
    ├── index.html          # main html
    └── index.tsx           # start point
```

Refer to the [coding convention](doc/CODING_CONVENTIONS.md) for more details on how you should structure your codes

## Usage

### LocalHost

- Running the application
    1. Install dependencies -- `yarn install`
    2. Start the web -- `yarn run start`

- Testing using Cypress
    1. Pull Cypress Image -- `sudo docker pull cypress/included:3.4.0`
    2. Run Cypress -- `sudo docker run -it --net=host -v $PWD:/cypress -w /cypress cypress/included:3.4.0`

### Docker

1. `sudo docker build -t webfrontend_image .`

2. `sudo docker run --name webfrontend -d webfrontend_image`

## Development

- **TLDR**
    - [Folder Structure & Coding Conventions](doc/CODING_CONVENTIONS.md)
    - [Webpack configuration details](../../doc/WEBPACK.md)
    - [End to End Testing using Cypress](cypress)
- **Notes**
    - **React-Component-Library** : 
        - The custom reusable React component library is installed by `yarn add ../react-component-library` 
    - **Websocket**
        - We are implementing websocket via stomp protocol
- **Future Works**
    - create a `Search Component`

## Learning Materials
- [React Typescript Tutorial](https://www.youtube.com/watch?v=Z5iWr6Srsj8)
- [Using Elastic with React-Router](https://github.com/elastic/eui/blob/master/wiki/react-router.md)
- [React loading screen tactics](https://medium.com/front-end-weekly/react-loading-screen-tactics-improving-user-experience-9452f183c00b)
- [Typescript for redux-thunk](https://github.com/reduxjs/redux-thunk/blob/master/test/typescript.ts)
- [Dockerizing Modern Web Apps](https://medium.com/@hendrikwallbaum/dockerizing-spas-9f72b7867e41)
- [React Router Dom - Protected Routes](https://www.tuckerblackwell.com/handle-auth-with-react-router-and-typescript/)

## Credits
- [Loading.gif designed by Jane Sorkin](https://medium.com/better-programming/a-quick-and-easy-react-js-loading-screen-with-hooks-940feccd553f)
