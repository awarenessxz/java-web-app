# Guide to Fix Invalid Hook Error

**Some background context:** When you try to use this "react-component-library" locally using the command 
`yarn add path/to/example-ui-library`, you will hit with the following React Error

```
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
```

The reason in our case is the third one:

```
3. You might have more than one copy of React in the same app
```

This happens because when we yarn add our local library, yarn copies the `node_modules` directory as well, so we get 
something that looks like this:

```
some-project/
  node_modules/
    example-ui-library/
      build/
      node_modules/
        react/
      package.json
      ...
    react/
```

So, the require('react') in our library's bundle resolves to the copy of React that is inside the copied node_modules directory of example-ui-library (we have react there because it's a dev dependency) rather than the one inside the node_modules directory of some-project.

As a consequence, we end up using two copies of React in our project: the example-ui-library's one and the some-project's one.

To solve this issue, we can either prevent the node_modules directory from being copied during the installation of the library or just delete the copied node_modules right after the installation.

There doesn't seem to be a way to prevent node_modules from being copied, so we will go with the second option.

Turns out that we can delete the node_modules directory right after our library installs by using a postinstall script that we specify in the scripts of our library's package.json:

```
"scripts": {
  ...,
  "postinstall": "rm -rf node_modules"
},
```

When we now install our library again, we should no longer have the invalid hooks call error from before.

## Credits

- [How to create a local React + TypeScript library that I can use across my React projects?](https://www.claritician.com/how-to-create-a-local-react-typescript-library-that-i-can-use-across-my-react-projects)