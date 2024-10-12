import { Elysia, error, NotFoundError, t } from "elysia";

const userController = new Elysia({ prefix: "/users" })
  .post("/", ({ body }) => {
    throw new Er("error", {  })
    return { message: "User created", user: body };
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
    }),
    response: t.Object({
      message: t.String(),
      user: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    }),
    detail: {
      description: "Create a new user",
      tags: ["Users"],
    },
  })
  .post("/create", ({ body }) => {
    
  });

export default userController;