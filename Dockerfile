FROM node:10 as node

ARG URL_SERVEUR
ENV URL_SERVEUR ${URL_SERVEUR}
ENV NODE_ENV production

WORKDIR /app/
COPY package.json package-lock.json ./
RUN npm install --production=false

COPY . ./
RUN npm run build

FROM nginx

COPY --from=node /app/public /usr/share/nginx/html/
