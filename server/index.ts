import { Elysia, t } from "elysia";

import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import swagger from "@elysiajs/swagger";

import logger from "./logger";
import userController from "./api/users.controller";

const port = process.env.PORT ?? 3000;
const app = new Elysia()
  .use(staticPlugin())
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: "Ktty API",
        description: "API Documentation for Ktty",
        version: "1.0.0",
      },
      tags: [
        { name: "App", description: "General endpoints" },
        { name: "Auth", description: "Authentication endpoints" },
      ],
    },
  }))
  .onError(({ code, error, set }) => {
    logger.error(`Error ${code}: ${error.message}`);
    set.status = code === 'NOT_FOUND' ? 404 : 500;
    return { error: error.message };
  })
  .onRequest(({ request }) => {
    logger.info(`Incoming request: ${request.method} ${request.url}`);
  })

  .use(userController)

  .listen(port);

logger.info(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);

export { app };
export type App = typeof app;