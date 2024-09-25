# Estágio de desenvolvimento
FROM node:18 AS development

WORKDIR /app
COPY package*.json ./

# Instalar dependências
RUN npm install

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli@16

# Copiar o código-fonte
COPY . .

# Expor a porta para desenvolvimento
EXPOSE 4200

# Comando padrão para desenvolvimento
CMD ["ng", "serve", "--host", "0.0.0.0"]

# Estágio de produção
FROM node:18 AS build

WORKDIR /app

# Copiar dependências e código
COPY package*.json ./
RUN npm install
COPY . .

# Compilar a aplicação
RUN npm run build --prod

# Estágio de produção com Nginx
FROM nginx:alpine

# Copiar os arquivos compilados para o Nginx
COPY --from=build /app/dist/rest-countries /usr/share/nginx/html

# Expor a porta para Nginx
EXPOSE 80

# Comando padrão para produção
CMD ["nginx", "-g", "daemon off;"]
