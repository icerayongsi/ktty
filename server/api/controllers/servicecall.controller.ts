import { Elysia, t } from "elysia"

const serviceCallController = new Elysia({ prefix: "/services-call" })
    .post("/calling" , ({ body, server }) => {
        if (body.mcNo === "mc1" && body.fixCode === "fc3" && body.serviceType === "tpm") {
            server?.publish(`device/af771d5ccec2c270`, "Calling form sender");
            
            return { result: true }
        }
        return { result: false }
    }, {
        body : t.Object({
            mcNo: t.String(),
            fixCode: t.String(),
            serviceType: t.String()
        }),
        response: t.Object({
            result : t.Boolean()
        })
    })

export default serviceCallController;