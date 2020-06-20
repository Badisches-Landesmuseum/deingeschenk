# ====
# BASE
# ====

FROM node:12 as base

RUN adduser --gecos '' --disabled-password --disabled-login --home /app app

USER app:app
WORKDIR /app


# ================
# BUILD/TEST STAGE
# ================

FROM base as build

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install --non-interactive --frozen-lockfile

COPY --chown=app:app .  .

ARG NODE_ENV=development
ARG BABEL_ENV=development

RUN yarn typecheck
RUN yarn lint
RUN yarn build-app
RUN yarn build-storybook

ENTRYPOINT []


# =================
# APP RELEASE STAGE
# =================

FROM nginx:1.15-alpine as app
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80


# =======================
# STORYBOOK RELEASE STAGE
# =======================

FROM nginx:1.15-alpine as storybook
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
