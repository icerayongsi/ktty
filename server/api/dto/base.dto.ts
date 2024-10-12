import { t } from "elysia";

export const ok = <T>(dataSchema: T) => ({
    status: t.Integer(),
    message: t.Optional(t.String()),
    data: dataSchema
});
