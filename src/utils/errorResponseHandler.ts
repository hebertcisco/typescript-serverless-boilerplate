import responseHandler from "./responseHandler";
import type { TErrorResponse } from "../shared/types/error-response-type";

export function errorResponseHandler(error?: TErrorResponse) {
  if (error instanceof Error) {
    return responseHandler.createResponse({
      statusCode: 400,
      body: JSON.stringify({
        message: error.message,
      }),
    });
  }
  return responseHandler.createResponse({
    statusCode: 400,
    body: JSON.stringify({
      message: error?.message || "",
      baseURL: error?.config?.baseURL || "",
      endpoint: error?.config?.url || "",
      dataMessage: error?.response?.data?.message || "",
      status: error?.response?.data?.statusCode || "",
    }),
  });
}
