FROM node:16.16.0 as build-stage
WORKDIR /var/jenkins_home/workspace/motoo/frontend
COPY package*.json ./
RUN npm install --force
COPY . .

RUN npm run build
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /app
WORKDIR /app
RUN mkdir ./build

# RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /var/jenkins_home/workspace/motoo/frontend/build ./build
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]