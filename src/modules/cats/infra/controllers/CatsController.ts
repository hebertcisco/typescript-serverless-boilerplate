import type { APIGatewayProxyEvent } from "aws-lambda";

import { contentTypeHandler } from "../../../../shared/helpers/contentTypeHandler";
import { errorResponseHandler } from "../../../../shared/helpers/errorResponseHandler";

import { CreateCatService } from "../../services/CreateCatService";
import { ListAllCatService } from "../../services/ListAllCatService";

import responseHandler from "../../../../shared/helpers/responseHandler";

import type { ICreateCatDTO } from "../../dtos/ICreateCatDTO";
import type { IResponseHandlerReturn } from "../../../../shared/helpers/responseHandler";
import { Logger } from "../../../../shared/utils/Logger";

export default class CatsController {
  private logger: Logger = new Logger({ context: CatsController.name });
  private createCatService: CreateCatService = new CreateCatService();
  private listAllCatService: ListAllCatService = new ListAllCatService();

  public async create(
    event: APIGatewayProxyEvent
  ): Promise<IResponseHandlerReturn> {
    contentTypeHandler(event);
    if (!event.body) {
      this.logger.error("Body is empty");
      return responseHandler.createResponse({
        statusCode: 400,
        body: "The request body is empty",
      });
    }
    const { name, age, breed } = JSON.parse(event.body) as ICreateCatDTO;
    try {
      if (!name || !age || !breed) {
        this.logger.error("Missing required fields");
        return responseHandler.createResponse({
          statusCode: 400,
          body: JSON.stringify({
            message: "Missing required fields",
          }),
        });
      }
      const catCreated = await this.createCatService.execute({
        name,
        age,
        breed,
      });
      if (!catCreated) {
        this.logger.error("Error creating cat");
        return responseHandler.createResponse({
          statusCode: 400,
          body: JSON.stringify({
            message: "Error creating cat",
          }),
        });
      }
      return responseHandler.createResponse({
        statusCode: 201,
        body: JSON.stringify(catCreated),
      });
    } catch (error) {
      return errorResponseHandler(error);
    }
  }
  public async listAll(
    event: APIGatewayProxyEvent
  ): Promise<IResponseHandlerReturn> {
    const cats = await this.listAllCatService.execute();
    this.logger.info(event.httpMethod + " - " + event.path);
    return responseHandler.createResponse({
      statusCode: 200,
      body: JSON.stringify(cats || []),
    });
  }
}
