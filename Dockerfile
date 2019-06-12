FROM node:10 as node

ARG URL_SERVEUR
ENV URL_SERVEUR ${URL_SERVEUR}
ARG JETON_CLIENT_ROLLBAR
ENV JETON_CLIENT_ROLLBAR ${JETON_CLIENT_ROLLBAR}

WORKDIR /app/
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:alpine

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/public /usr/share/nginx/html/
