# Coding Conventions
1. **Folder Structure**
    - module based structuring
    - for assets like images / scripts, put into assets folder.
2. **Code in Typescript**
    - declare type definitions within components or create a new 
3. **Naming of files**
    - React jsx files --> **CamelCase** `eg. SomeComponent.tsx`
    - Javascript files --> **dashes** `eg. some-util.ts`
    - Readme files --> **CAPS + Underline** `eg SOME_README.md`
4. **Functional Components**
    - code **functional components + hooks** instead of **class components**
5. **State Management**
    - use **local state** instead of **global state** if possible
        - local state
            - use `useState` instead of **useReducer** if possible
        - global state
            - use `redux` instead of **useReducer**/**useContext** if possible
6. **CSS Styling**
    - use **CSS modules** as much as possible
7. **Absolute file import**
    - ??
8. **Data Fetching**
    - make use of **fetch-utils.ts** inside `src/modules/common/utils` for data fetching
9. **Frontend Testing**
    - write cypress test for end-to-end test
    - ensure that frontend testing pass before committing your codes
10. **Redux Actions / Reducer**
    - end redux action controller functions with the word **Action**. eg. updateSearchState**Action**
        ```
        export const updateSearchStateAction = () => (dispatch, getState) => {
            dispatch({
                type: UPDATE_SEARCH_STATE,
                payload: {
                    rules: [],
                    search: "search value",
                }
            });
        };
        ```


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
    └── module                             
        └── redux   
            ├── module-action.ts        # action creators: event that describe something happened in the application
            ├── module-action.types.ts  # types: redux action types + typescript type definitions
            └── module-reducer.ts       # reducer: event listener that updates states based on event (action) received
                         
    └── redux                           # global variable (state management)
        ├── redux-store.ts              # main object that stores the current Redux Application State
        └── root-reducer.ts             # combine all reducers
```

To use states in the redux store in components, make use of `useDispatch` and `useSelector` hooks
