import type { APIGatewayProxyEvent } from "aws-lambda";
import type { IResponseHandlerReturn } from "../helpers/responseHandler";

export class Router {
  constructor(private event: APIGatewayProxyEvent) {}
  public get(path: string, res: Promise<IResponseHandlerReturn>) {
    if (this.event.httpMethod === "GET" && this.event.path === path) {
      return res;
    }
  }
  public post(path: string, res: Promise<IResponseHandlerReturn>) {
    if (this.event.httpMethod === "POST" && this.event.path === path) {
      return res;
    }
  }
  public put(path: string, res: Promise<IResponseHandlerReturn>) {
    if (this.event.httpMethod === "PUT" && this.event.path === path) {
      return res;
    }
  }
  public delete(path: string, res: Promise<IResponseHandlerReturn>) {
    if (this.event.httpMethod === "DELETE" && this.event.path === path) {
      return res;
    }
  }
}
