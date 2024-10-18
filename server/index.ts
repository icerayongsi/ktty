import { Elysia, t } from "elysia";
import _ from "lodash";

import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import swagger from "@elysiajs/swagger";

import logger from "./logger";
import routes from "./api/controllers/routes";
import DatabaseContext from "./repositories/applicationDbContext";
import { BaseErrorResponse, BaseResponse } from "./api/dto/base.dto";
import {
  AuthorizationError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "./utils/exception";

const port = process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3000;
const app = new Elysia()
  .use(staticPlugin())
  .use(cors())
  .use(
    swagger({
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
    })
  )

  .onRequest(({ request }) => {
    logger.info(`Incoming request: ${request.method} ${request.url}`);
  })

  .ws("/notify/:hid", {
    // body: t.Object({
    //   message: t.String()
    // }),
    params: t.Object({
      hid: t.String(),
    }),
    open(ws) {
      const hid = ws.data.params.hid;

      logger.info(`[WS] Device '${hid}' is connected`);
      ws.subscribe(`device/${hid}`);
    },
    message(ws, message) {
      const hid = ws.data.params.hid;

      logger.info(`[WS] Received message form ${hid} :${message} `);
      ws.publish(`device/${hid}`, message);
      ws.send(message);
    },
    close(ws) {
      const hid = ws.data.params.hid;
      logger.info(`[WS] Device '${hid}' disconnected`);
      ws.unsubscribe(`device/${hid}`);
    },
  })

  .error("AUTHORIZATION_ERROR", AuthorizationError)
  .error("BAD_REQUEST_ERROR", BadRequestError)
  .error("NOT_FOUND_ERROR", NotFoundError)
  .error("VALIDATION_ERROR", ValidationError)
  .error("INTERNAL_SERVER_ERROR", InternalServerError)
  .onError(({ code, error, set }) => {
    logger.error(`Error ${code}: ${error.message}`);
    
    let errorResponse: BaseErrorResponse;
    switch (code) {
      case "BAD_REQUEST_ERROR": set.status = 400; break;
      case "AUTHORIZATION_ERROR": set.status = 403; break;
      case "NOT_FOUND_ERROR": set.status = 404; break;
      case "VALIDATION_ERROR": set.status = 422; break;
      case "INTERNAL_SERVER_ERROR": set.status = 500; break;
      default:
        set.status = 500;
        return {
          status: "error",
          message: "Internal Server Error",
        };
    }

    errorResponse = {
      status: set.status,
      message: error.toString().replace("Error: ", ""),
    };

    if (process.env.NODE_ENV === "production") errorResponse.stack = error.stack;

    return errorResponse;
  })

  .onAfterHandle(({ response, headers }) => {
    const res = response as BaseResponse;

    // Expeted 'api' fields should not be included in the response
    if (res.api) {
      const exceptedFields = _.findKey(res, (value) => value === res.api);
      let omitedResponse;
      if (exceptedFields) {
        omitedResponse = _.omit(response, exceptedFields);

        return new Response(JSON.stringify(omitedResponse), {
          ...headers,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  });

routes.forEach((controller) => {
  app.use(controller);
});

DatabaseContext.getInstance();

app.listen(port);

logger.info(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
