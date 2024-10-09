FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock* ./

RUN bun install

COPY . .

ARG SERVER_PORT
EXPOSE ${SERVER_PORT}

CMD ["bun", "run", "dev"]