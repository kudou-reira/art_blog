# pull official base image
FROM node:13.12.0-alpine

RUN apk add --no-cache bash

# set working directory
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app
RUN npm install
RUN npm install react-scripts@1.1.1 -g --silent

COPY . /app
# start app
CMD ["npm", "start"]