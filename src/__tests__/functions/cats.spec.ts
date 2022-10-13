/*export const handler: APIGatewayProxyHandler = async (
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
        body: "Bad request",
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
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handler } from "../../functions/cats";

describe("handler", () => {
  it("should be able to create a new cat", async () => {
    const cat = {
      name: "John",
      age: 2,
      breed: "Persa",
    };
    const event = {
      httpMethod: "POST",
      path: "/create",
      body: JSON.stringify(cat),
      headers: {
        "Content-Type": "application/json",
      },
      requestContext: null,
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, null, null);
    const response = result as APIGatewayProxyResult;
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
  });

  it("should not be able to create a new cat without name", async () => {
    const cat = {
      age: 2,
      breed: "Persa",
    };
    const event = {
      httpMethod: "POST",
      path: "/create",
      body: JSON.stringify(cat),
      headers: {
        "Content-Type": "application/json",
      },
      requestContext: null,
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, null, null);
    const response = result as APIGatewayProxyResult;
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should be able to list all cats", async () => {
    const event = {
      httpMethod: "GET",
      path: "/",
      headers: {
        "Content-Type": "application/json",
      },
      requestContext: null,
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, null, null);
    const response = result as APIGatewayProxyResult;
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
  it("should not be able to create a new cat without body", async () => {
    const event = {
      httpMethod: "POST",
      path: "/create",
      headers: {
        "Content-Type": "application/json",
      },
      requestContext: null,
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, null, null);
    const response = result as APIGatewayProxyResult;
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
  });
  it("should not be able to create a new cat without body", async () => {
    const event = {
      httpMethod: "PUT",
      path: "/create",
      headers: {
        "Content-Type": "application/json",
      },
      requestContext: null,
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, null, null);
    const response = result as APIGatewayProxyResult;
    expect(response.statusCode).toBe(405);
    expect(response.body).toBeDefined();
  });
});
