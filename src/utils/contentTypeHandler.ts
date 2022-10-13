import { APIGatewayProxyEvent } from "aws-lambda";
import responseHandler from "./responseHandler";

export function contentTypeHandler(event: APIGatewayProxyEvent) {
  if (event?.headers["Content-Type"] !== "application/json") {
    return responseHandler.createResponse({
      statusCode: 400,
      body: JSON.stringify({
        message: "Bad Request",
        error: "Content-Type must be application/json",
      }),
    });
  }
  return event;
}
