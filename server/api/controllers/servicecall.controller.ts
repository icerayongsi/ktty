import { Elysia, t } from "elysia"

const serviceCallController = new Elysia({ prefix: "/services-call" })
    .post("/calling" , ({ body, server }) => {
        // if (body.mcNo === "mc1" && body.fixCode === "fc3" && body.serviceType === "tpm") {
        //     server?.publish(`device/aff1baafbc575cf2`, "Calling form sender");
            
        //     return { result: true }
        // }
        const message = JSON.stringify({ 
            incomingCall : true,
            sender: "BRS 4",
            mcNo: body.mcNo,
            fixCode: body.fixCode,
            serviceType: body.serviceType,
            description: body.description ?? "Service call request received."
         });
        const canPublished = server?.publish(`device/aff1baafbc575cf2`, message);
        
        if (!!canPublished) {
            return { 
                result: true,
                message: "Service call request received."
             }
        }
        return { result: false, message: "Failed to send service call request." }
    }, {
        body : t.Object({
            mcNo: t.String(),
            fixCode: t.String(),
            serviceType: t.String(),
            description: t.Optional(t.String())
        }),
        response: t.Object({
            result: t.Boolean(),
            message: t.String()
        })
    })

export default serviceCallController;