import type { APIGatewayProxyEvent } from "aws-lambda";
import { Router } from "../../../../shared/utils/Router";
import CatsController from "../controllers/CatsController";

export class CatsRoutes {
  private catsController: CatsController = new CatsController();
  private router: Router;
  constructor(private event: APIGatewayProxyEvent) {
    this.router = new Router(this.event);
  }
  public listAll() {
    return this.router.get("/list", this.catsController.listAll(this.event));
  }
  public create() {
    return this.router.post("/create", this.catsController.create(this.event));
  }
}
