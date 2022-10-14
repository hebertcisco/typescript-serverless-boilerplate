#!/usr/bin/env node
import "dotenv/config";
import type { APIGatewayProxyEvent } from "aws-lambda";

import "../shared/infra/database/mongo";

import { CatsRoutes } from "../modules/cats/infra/routes/cats.routes";
import type { IResponseHandlerReturn } from "../shared/helpers/responseHandler";

export async function handler(
  event: APIGatewayProxyEvent
): Promise<IResponseHandlerReturn> {
  return new CatsRoutes(event).invoke();
}
