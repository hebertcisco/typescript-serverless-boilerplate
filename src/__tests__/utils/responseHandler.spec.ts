import responseHandler from "../../shared/helpers/responseHandler";

describe("responseHandler", () => {
  it("should be able to create a new cat", async () => {
    const response = responseHandler.createResponse({
      statusCode: 200,
      body: "Success",
    });
    expect(response).toBeDefined();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toContain("Success");
  });
});
