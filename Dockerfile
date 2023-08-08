FROM node:18-alpine
WORKDIR /app
COPY --chown=node:node package*.json /app
RUN npm ci
COPY . /app
RUN npm run build
CMD [ "node", "dist/main.js" ]
ENV NODE_ENV production
USER node
