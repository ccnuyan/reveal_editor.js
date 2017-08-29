FROM node:8.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm install --production --registry=https://registry.npm.taobao.org && npm cache clean --force
COPY . /usr/src/app

CMD [ "npm", "start" ]
EXPOSE 10000