# First stage: compile react client
FROM node:13.7.0-alpine3.11 AS builder
RUN mkdir /opt/build-client-stage/
WORKDIR /opt/build-client-stage
COPY client/package*.json ./
ADD client/package.json /opt/build-client-stage/
RUN npm install 
COPY client ./
RUN npm run build

# Second stage:
# base image
FROM node:13.7.0-alpine3.11

# set working directory
RUN mkdir -p /opt/wrecking-crew/client/build
WORKDIR /opt/wrecking-crew

# install and cache app dependencies
COPY package*.json ./
COPY server/ ./server/
COPY --from=builder /opt/build-client-stage/build ./client/build

RUN npm install

# specify port
EXPOSE 8080

# start app
CMD ["node", "server/server.js"]

# run as non-root user
USER node
