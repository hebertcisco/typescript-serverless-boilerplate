import responseHandler from "../helpers/responseHandler";
import type { IResponseHandlerReturn } from "../helpers/responseHandler";

export class Invoker {
  public constructor(private args: Promise<IResponseHandlerReturn>[]) {}
  public async invoke(): Promise<IResponseHandlerReturn> {
    const responses = await Promise.all(this.args);
    const filteredResponses = responses.filter(
      (response) => response !== undefined
    );
    if (filteredResponses.length > 0) {
      return filteredResponses[0];
    }
    return responseHandler.createResponse({
      statusCode: 404,
      body: JSON.stringify({
        message: "Not found",
      }),
    });
  }
}
