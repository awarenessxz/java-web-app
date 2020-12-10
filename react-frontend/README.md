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

```bash
root
├── config                  # webpack configuration files
├── doc                     # documentations
└── src
    ├── components          # components used by pages
    ├── pages               # main web pages
    ├── redux               # global variable (state management)
    ├── styles              # css global style sheets (css modules with SASS)
    └── utils               # helper functions
        ├── hooks           # custom hooks 
        ├── routing         # routing / menu / navigation related
        └── ...             # etc...
```

Refer to the [coding convention](doc/CODING_CONVENTIONS.md) for more details on how you should structure your codes

## Usage

1. Install dependency
    - `yarn install`

2. Start the web
    - `yarn run start`

## Development

- **TLDR**
    - [Folder Structure & Coding Conventions](doc/CODING_CONVENTIONS.md)
    - [Webpack configuration details](doc/WEBPACK.md)
- **Notes**
    - **React-Component-Library** : 
        - The custom reusable React component library is installed by `yarn add ../react-component-library` 
- **Future Works**
    - create `Announcement Console` for managing announcements
    - create `announcements-util` to poll for announcement on an hourly interval
    - create `fetch-util` to handle all API fetch
    - create a `Search Component`

## Learning Materials
- [React Typescript Tutorial](https://www.youtube.com/watch?v=Z5iWr6Srsj8)
- [Using Elastic with React-Router](https://github.com/elastic/eui/blob/master/wiki/react-router.md)
- [React loading screen tactics](https://medium.com/front-end-weekly/react-loading-screen-tactics-improving-user-experience-9452f183c00b)
- [Typescript for redux-thunk](https://github.com/reduxjs/redux-thunk/blob/master/test/typescript.ts)

## Credits
- [Loading.gif designed by Jane Sorkin](https://medium.com/better-programming/a-quick-and-easy-react-js-loading-screen-with-hooks-940feccd553f)