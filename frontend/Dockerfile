FROM node:lts-slim
WORKDIR /usr/src/esiea-delta/frontend
COPY . .
RUN npm ci --force

EXPOSE 3000
CMD [ "npm", "start" ]