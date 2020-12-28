###################################################################################################################
# Stage 0: "build-stage", Build and compile the frontend codes
###################################################################################################################

# Pull base Node image
FROM node:12-alpine as build-stage

# Step 1: Build Component Library
# This is because we are using 'yarn add ../react-component-library'. This step can be removed when component library is published to node artifactory
WORKDIR /react-component-library
COPY react-component-library/package*.json /react-component-library/
RUN yarn install --ignore-scripts
COPY react-component-library/ /react-component-library/
RUN yarn run build

# Step 2: Build Frontend
# mkdir /app and cd into /app
WORKDIR /app
# Install app depedencies (a wildcard is used to ensure both package.json AND package-lock.json are copied where available).
# These depdencies will be cached until package.json changes
COPY react-base-app/package*.json /app/
RUN yarn install
# Bundle app Source (outputs into build folder)
COPY react-base-app/ /app/
RUN yarn run build

###################################################################################################################
# Stage 1: Setting up compiled app, ready for production with Nginx
###################################################################################################################

# Pull base Nginx image
FROM nginx:latest
# Copy compiled code into Nginx
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf
COPY --from=build-stage /app/config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
