FROM node:8.12
WORKDIR /code
RUN npm install -g create-react-app yarn
ADD package.json /code
RUN yarn install
RUN node rebuild node-sass