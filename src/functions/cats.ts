#!/usr/bin/env node
import "dotenv/config";
import type { APIGatewayProxyEvent } from "aws-lambda";

import "../shared/infra/database/mongo";

import { CatsRoutes } from "../modules/cats/infra/routes/cats.routes";
import { Invoker } from "../shared/utils/Invoker";

import type { IResponseHandlerReturn } from "../shared/helpers/responseHandler";

export async function handler(
  event: APIGatewayProxyEvent
): Promise<IResponseHandlerReturn> {
  const catsRoutes = new CatsRoutes(event);
  const invoker = new Invoker([catsRoutes.listAll(), catsRoutes.create()]);
  return invoker.invoke();
}
