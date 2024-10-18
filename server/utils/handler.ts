import { BaseErrorResponse, BaseResponse } from "../api/dto/base.dto";
 
export const Ok = <T>(data: T, message = "") => {
    const response: BaseResponse = {
        api: true,
        status: 200,
        message: message,
    };
    return {
        ...response,
        data
    };
}

export const ExceptionResponse = (code: number, message = "",stack?: string) => {
    const response: BaseErrorResponse = {
        status: code,
        message: message
    };

    if (stack) response.stack = stack;

    return response;
}
