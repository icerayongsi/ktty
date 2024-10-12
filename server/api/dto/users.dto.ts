import { t } from "elysia";

export const CreateUser = t.Object({
    username: t.String(),
    password: t.String(),
});

export const UserResponse = t.Object({
    username: t.String(),
    // Add other user fields here, excluding sensitive information like password
});

