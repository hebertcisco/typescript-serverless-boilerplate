import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";

import responseHandler from "../utils/responseHandler";
import * as crypto from "node:crypto";
import { ICreateCatDTO, IResponseCreateCat } from "../dtos/ICreateCatDTO";
import { contentTypeHandler } from "../utils/contentTypeHandler";
import { errorResponseHandler } from "../utils/errorResponseHandler";

const catsData: IResponseCreateCat[] = [];

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  if (event.httpMethod === "GET") {
    return responseHandler.createResponse({
      statusCode: 200,
      body: JSON.stringify(catsData),
    });
  }

  if (event.httpMethod === "POST" && event.path === "/create") {
    contentTypeHandler(event);
    if (!event.body) {
      return responseHandler.createResponse({
        statusCode: 400,
        body: "The request body is empty",
      });
    }
    const { name, age, breed } = JSON.parse(event.body) as ICreateCatDTO;
    try {
      if (!name || !age || !breed) {
        return responseHandler.createResponse({
          statusCode: 400,
          body: JSON.stringify({
            message: "Missing required fields",
          }),
        });
      }
      const catCreatedResponse: IResponseCreateCat = {
        breed,
        age,
        name,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return responseHandler.createResponse({
        statusCode: 201,
        body: JSON.stringify(catsData.push(catCreatedResponse)),
      });
    } catch (error) {
      return errorResponseHandler(error);
    }
  }
  return responseHandler.createResponse({
    statusCode: 405,
    body: JSON.stringify({
      message: "Method not allowed",
    }),
  });
};
