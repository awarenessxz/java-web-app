/*
 * This file was generated by the Gradle 'init' task.
 *
 * This is a general purpose Gradle build.
 * Learn how to create Gradle builds at https://guides.gradle.org/creating-new-gradle-builds
 */

// apply configuration to all project in gradle build
allprojects {
    task("hello").doLast {
        println("I'm ${project.name}")
    }
}