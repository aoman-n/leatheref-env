FROM node:10
WORKDIR /usr/src/frontend-app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 4000

CMD ["yarn", "start"]