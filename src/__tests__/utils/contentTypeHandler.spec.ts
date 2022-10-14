import { APIGatewayProxyEvent } from "aws-lambda";
import { contentTypeHandler } from "../../shared/helpers/contentTypeHandler";

describe("contentTypeHandler", () => {
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
    } as unknown as APIGatewayProxyEvent;
    const response = contentTypeHandler(event);
    expect(response).toEqual(event);
  });
});
