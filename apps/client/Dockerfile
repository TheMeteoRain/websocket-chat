FROM node:24.1.0-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production
ENV CI=1
ENV PORT=5200
EXPOSE $PORT

RUN corepack enable

WORKDIR /opt/rally
RUN adduser --group --system rally
RUN chown -R rally:rally .

COPY --chown=rally:rally ./build/ ./build
RUN mv ./build/package.json ./package.json
RUN mv ./build/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --chown=rally:rally ./server.js ./server.js
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
USER rally

CMD [ "node",  "server.js" ]
