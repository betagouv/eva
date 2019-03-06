FROM node:10 as node

WORKDIR /app/
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx

COPY --from=node /app/public /usr/share/nginx/html/
