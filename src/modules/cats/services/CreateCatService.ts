import * as crypto from "node:crypto";

import { CatsRepository } from "../infra/database/repositories/CatsRepository";

import type { ICreateCatDTO } from "../dtos/ICreateCatDTO";
import type { IResponseCreateCat } from "../interfaces/cat.interface";

export class CreateCatService {
  private catsRepository: CatsRepository = new CatsRepository();
  public async execute({
    name,
    age,
    breed,
  }: ICreateCatDTO): Promise<IResponseCreateCat> {
    const catCreatedResponse: IResponseCreateCat = {
      breed,
      age,
      name,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const savedCat = await this.catsRepository.create(catCreatedResponse);
    if (!savedCat) {
      throw new Error("Error to create cat");
    }
    return savedCat;
  }
}
