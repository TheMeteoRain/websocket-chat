FROM node:24.1.0-slim AS base

ENV HOST=0.0.0.0
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV development
ENV CI=1

RUN corepack enable

WORKDIR /opt/rally
RUN adduser --group --system rally
COPY --chown=rally:rally . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm nx sync
RUN pnpm nx run @rally/generate-package-json:build
