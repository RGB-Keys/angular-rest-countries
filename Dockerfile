FROM node:18 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@16
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]


FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod


FROM nginx:alpine
COPY --from=build /app/dist/rest-countries /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
