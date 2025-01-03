ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --include dev

COPY --chown=node:node . .

USER node



FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

ENV NODE_ENV=production
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

USER node



FROM node:${NODE_VERSION}-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node package*.json ./

EXPOSE 4000

ENTRYPOINT ["node", "dist/main.js"]
