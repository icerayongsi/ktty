import { t, TSchema } from "elysia";

export const baseResponse = t.Object({
    api: t.Boolean(),
    status: t.Integer(),
    message: t.Optional(t.String()),
})

export type BaseResponse = typeof baseResponse.static;

export const baseErrorResponse = t.Object({
    status: t.Integer(),
    message: t.Optional(t.String()),
    stack: t.Optional(t.String()),
});

export type BaseErrorResponse = typeof baseErrorResponse.static;

export const Response = <T extends TSchema>(dataSchema: T) => t.Object({
    ...baseResponse.properties,
    data: dataSchema,
});

export const ErrorResponse = <T extends TSchema>(dataSchema: T) => t.Object({
    ...baseResponse.properties,
    data: dataSchema,
});