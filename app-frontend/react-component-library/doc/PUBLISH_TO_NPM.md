# Publishing to NPM Artifactory

## Configuration

- Refer to [package.json](../package.json) for the publishing config
    - add the following script to build the library before publishing
        - `"prepublishOnly": "yarn run build"`
    - point publishing registry to npm private repository
        ```
        "publishConfig": {
            "registry": <LINK TO PRIVATE REPOSITORY>
        }
        ```
- To get logic credentials for CI
    - Run the command `curl -u $artifactory_user:$artifactory_pass https://artifactory.com/api/npm/auth`
    - Add the following config to `.npmrc` file
        - `npm config set _auth ${AUTH_TOKEN}`
        - `npm config set email ${EMAIL}`
        - `npm config set user ${artifactory_user}`
        - `npm config set always_auth true`
        
## Semantic Versioning

Follow these guidelines when changing the versions:

- First Release (**New Product**) -- Start with 1.0.0
- Bug Fixes / Feature Updates (**Patch Release**) -- Increment the third digit (eg. 1.0.1)
- New Feature (**Minor Release**) -- Increment the middle digit and reset the last digit to zero (eg. 1.2.0)
- Changes that break backward compatibility (**Major Release**) -- Increment the first digit and reset the middle & last digit to zero (eg. 2.0.0)

## Manually Publishing

1. Login to Artifactory - `yarn login`
2. Publish to Artifactory - `yarn publish`

## Automatic Publishing (CI/CD)

1. Whenever a commit is pushed to master, the gitlab CI will be executed
2. To publish to artifactory, go to gitlabs - repository - tags
    - create a new tag (Note: follow the semantic versioning)
    - the cd will be triggered and the library will be published to artifactory.
    