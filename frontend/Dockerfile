FROM node:10
RUN mkdir /frontend-app
WORKDIR /frontend-app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . /frontend-app
# EXPOSE 4000

CMD ["yarn", "start"]