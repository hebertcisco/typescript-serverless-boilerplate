import type { APIGatewayProxyEvent } from "aws-lambda";

import CatsController from "../controllers/CatsController";

import type { IResponseHandlerReturn } from "../../../../shared/helpers/responseHandler";

export class CatsRoutes {
  private catsController: CatsController = new CatsController();
  constructor(private event: APIGatewayProxyEvent) {}
  private list() {
    if (this.event.httpMethod === "GET" && this.event.path === "/list") {
      return this.catsController.list(this.event);
    }
  }
  private create() {
    if (this.event.httpMethod === "POST" && this.event.path === "/create") {
      return this.catsController.create(this.event);
    }
  }
  public async invoke(): Promise<IResponseHandlerReturn> {
    return this.list() || this.create();
  }
}
