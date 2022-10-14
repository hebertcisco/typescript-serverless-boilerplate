import { CatsRepository } from "../infra/database/repositories/CatsRepository";

import type { IResponseCreateCat } from "../interfaces/cat.interface";

export class ListAllCatService {
  private catsRepository: CatsRepository = new CatsRepository();
  public async execute(): Promise<IResponseCreateCat[]> {
    return this.catsRepository.list();
  }
}
