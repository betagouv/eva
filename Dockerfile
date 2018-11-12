FROM node:10.13-jessie
ARG dossier_source

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY ${dossier_source} ./
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
