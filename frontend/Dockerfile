# ---- Step 1: Build Angular App ----
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Fixed build command
RUN npm run build

# ---- Step 2: Serve with NGINX ----
FROM nginx:alpine

# Fix Angular dist folder name
COPY --from=build /app/dist/angular-15-crud /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
