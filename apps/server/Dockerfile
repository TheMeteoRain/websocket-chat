FROM node:24.1.0-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production
ENV CI=1
ENV PORT=5300
EXPOSE $PORT

RUN corepack enable

WORKDIR /opt/rally
RUN adduser --group --system rally
RUN chown -R rally:rally .

COPY --chown=rally:rally ./dist .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
USER rally

CMD [ "node",  "main.js" ]
