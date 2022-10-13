import { errorResponseHandler } from "../../utils/errorResponseHandler";

describe("errorResponseHandler", () => {
  it("should be able to create a new cat", async () => {
    const error = {
      message: "Error",
      config: {
        baseURL: "https://api.com",
        url: "/endpoint",
      },
      response: {
        data: {
          message: "Error message",
          statusCode: 400,
        },
      },
    };
    const response = errorResponseHandler(error);
    expect(response).toBeDefined();
    expect(response.statusCode).toEqual(400);
    expect(response.body).toContain("Error message");
  });
});
