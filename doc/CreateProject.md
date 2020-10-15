# Overview on how to create this project

1. Multi Gradle Project
    - To create a multi gradle project. In the root directory, run `gradle init`
    - Specify all the sub projects inside `settings.gradle.kts`
    - Gradle Lifecycle
        - initialization --> determine which project will be included in the build (settings.gradle.kts)
        - configuration --> gradle executes code in build file
            - Parent Build.gradle gets executed before Sub Project
        - execution --> gradle determines which task to be executed in what order based on command
            - Parent Task gets executed before Sub Project
   