import { Elysia, t } from "elysia";

const userController = new Elysia({ prefix: "/users" })
  .get("/", () => {
    return { message: "List of users" };
  }, {
    response: t.Object({
      message: t.String(),
    }),
    detail: {
      description: "Get all users",
      tags: ["Users"],
    },
  })
  .get("/:id", ({ params: { id } }) => {
    return { message: `User details for id: ${id}` };
  }, {
    params: t.Object({
      id: t.String(),
    }),
    response: t.Object({
      message: t.String(),
    }),
    detail: {
      description: "Get user by ID",
      tags: ["Users"],
    },
  })
  .post("/", ({ body }) => {
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
  });

export default userController;