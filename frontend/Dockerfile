# FROM node:10
FROM node:12.2.0-alpine
RUN mkdir /frontend-app
WORKDIR /frontend-app
COPY package*.json /frontend-app

ENV PATH /frontend-app/node_modules/.bin:$PATH
# COPY yarn.lock /frontend-app
# RUN yarn install
RUN npm install --silent
COPY . /frontend-app
# EXPOSE 4000

# CMD ["yarn", "start"]
CMD ["npm", "start"]