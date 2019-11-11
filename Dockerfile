FROM node:10.13 as build-deps
WORKDIR /usr/src/app
RUN rm -rf node_modules
RUN rm -rf .next
RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM node:10.13-alpine
# ENV NODE_ENV production
# # Setting working directory. All the path will be relative to WORKDIR
# WORKDIR /usr/src/app
# COPY . .


# RUN yarn build
# EXPOSE 3000

# CMD [ "yarn", "run", "start" ]

# FROM nginx:alpine
# COPY /build/usr/share/nginx/html


# FROM node:10.13-alpine
# ENV NODE_ENV production
# # Setting working directory. All the path will be relative to WORKDIR
# WORKDIR /usr/src/app


# COPY . ./

# RUN rm -rf node_modules
# RUN rm -rf .next
# RUN rm yarn.lock

# RUN yarn

# RUN yarn build

# EXPOSE 3000

# CMD [ "yarn", "run", "start" ]

# FROM nginx:alpine
# COPY /build/usr/share/nginx/html
# EXPOSE 3000
# CMD [“nginx”, “-g”, “daemon off;”]

# COPY ["package.json", "yarn.lock*", "npm-shrinkwrap.json*", "./"]
# RUN yarn 
# COPY . .

# # Building app
# RUN yarn build

# EXPOSE 3000
# CMD npm start