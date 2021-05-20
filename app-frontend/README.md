# Frontend / Web Interface (React)

The web application is coded primarily using **React** as the base web framework. Additional technology stack includes the 
following:

- Typescript
- Webpack 5 / Babel / Rollup
- Storybook
- Cypress / React Testing-library
- SASS / CSS Modules
- ElasticUI / MaterialUI

Refer to these documentations for the implementation of some features in the web app:

- [Announcement](doc/ANNOUNCEMENT_IMPLEMENTATION.md)

## Folder Structure

```
root
├── react-base-app              # Main web app
├── react-component-library     # Custom Reusable React Component Library
└── react-micro-frontend        # Sub web app that is consumes by main app  
```

## Usage

### Localhost

1. Build React Component Library
    - `cd react-component-library`
    - `yarn install --ignore-scripts`
    - `yarn run build`

2. Start React Micro Frontend
    - `cd react-micro-frontend`
    - `yarn install`
    - `yarn start`

3. Start the Main Frontend App
    - `cd react-frontend`
    - `yarn install`
    - `yarn start`

### Docker

1. Build the webapp
    - `sudo docker build -t webapp_image .`

2. Run the webapp
    - `sudo docker run --net=host -d --name webapp webapp_image`

### Kubernetes


## References

- [React is Docker built with multi stage docker builds including testing](https://medium.com/@tiangolo/react-in-docker-with-nginx-built-with-multi-stage-docker-builds-including-testing-8cc49d6ec305)
