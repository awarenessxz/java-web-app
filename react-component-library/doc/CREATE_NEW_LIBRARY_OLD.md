# Content

- [Adding Jest & React-Testing-Library](#adding-jest-and-react-testing-library)
                                         
### Adding Jest and React-Testing-Library       

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

