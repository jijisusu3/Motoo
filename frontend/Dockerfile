FROM node:16.16.0 as build-stage
WORKDIR /jenkins/workspace/motoo/frontend
COPY package*.json ./
RUN npm install --force
COPY . .

RUN npm run build
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /app
WORKDIR /app
RUN mkdir ./build

# RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /jenkins/workspace/motoo/frontend/build ./build
COPY ./default.conf /etc/nginx/conf.d/k7b204.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]