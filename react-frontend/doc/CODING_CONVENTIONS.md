# Coding Conventions

- Code using typescript
- Use CSS Modules for components instead of global CSS

## Redux 

In a nutshell, redux uses a one way data flow for state management

![one-way-data-flow](images/redux-one-way-data-flow.png)

- view: dispatch actions
- reducer: receives actions and update state
- state: view listens for state change

In reference to our project, please take note of the following

```bash
root
└── src
    └── redux                           # global variable (state management)
        ├── module              
            ├── module-action.ts        # action creators: event that describe something happened in the application
            ├── module-action.types.ts  # types: redux action types + typescript type definitions
            └── module-reducer.ts       # reducer: event listener that updates states based on event (action) received
    
        ├── redux-store.ts              # main object that stores the current Redux Application State
        └── root-reducer.ts             # combine all reducers
```

To use states in the redux store in components, make use of `useDispatch` and `useSelector` hooks
