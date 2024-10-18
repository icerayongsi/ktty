import { Elysia, t } from "elysia";
import { Response } from "../dto/base.dto";
import { BadRequestError, NotFoundError } from "../../utils/exception";
import { Ok } from "../../utils/handler";

const userController = new Elysia({ prefix: "/users" })
  .post("/", ({ body }) => {
    //throw new NotFoundError("Invalid request payload");
    return Ok({ user: body },"User created");
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
    }),
    response: Response(t.Object({
      user: t.Object({
        name: t.String(),
        email: t.String(),
      })
    })),
    detail: {
      description: "Create a new user",
      tags: ["Users"],
    },
  })

export default userController;