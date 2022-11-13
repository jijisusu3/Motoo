FROM node:16.16.0 as build-stage
WORKDIR /var/jenkins_home/workspace/motoo/frontend
COPY package*.json ./
RUN npm install --force
COPY . .

RUN npm run build
FROM nginx:alpine
# RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /var/jenkins_home/workspace/motoo/frontend/build /usr/share/nginx/html
# RUN mkdir /app
# WORKDIR /app
# RUN mkdir ./build

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]