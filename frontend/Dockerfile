FROM node:16.16.0 as build-stage
WORKDIR /app
COPY package*.json ./

RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]