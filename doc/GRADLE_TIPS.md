# Tips on Gradle

## Useful Gradle Commands

- Inside Root Directory: `gradlew projects` --> list all projects
- `gradlew tasks --all` --> show all tasks available

## How to create multi gradle project

- To create a multi gradle project. In the root directory, run `gradle init`
- Specify all the sub projects inside `settings.gradle.kts`
- Gradle Lifecycle
    - initialization --> determine which project will be included in the build (settings.gradle.kts)
    - configuration --> gradle executes code in build file
        - Parent Build.gradle gets executed before Sub Project
    - execution --> gradle determines which task to be executed in what order based on command
        - Parent Task gets executed before Sub Project
