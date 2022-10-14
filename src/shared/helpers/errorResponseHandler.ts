import responseHandler from "./responseHandler";
import { Logger } from "../utils/Logger";
import type { TErrorResponse } from "../types/error-response-type";

export function errorResponseHandler(error?: TErrorResponse) {
  const logger: Logger = new Logger({ context: errorResponseHandler.name });
  if (error instanceof Error) {
    logger.error(error.message);
    return responseHandler.createResponse({
      statusCode: 400,
      body: JSON.stringify({
        message: error.message,
      }),
    });
  }
  logger.error(error?.message);
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
