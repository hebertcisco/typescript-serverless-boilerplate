import { CatsModel } from "../schemas/CatsSchema";

import type { IResponseCreateCat } from "../../../interfaces/cat.interface";

export class CatsRepository {
  constructor() {}
  public async create(cat: IResponseCreateCat): Promise<IResponseCreateCat> {
    const createdCat = await CatsModel.create(cat);

    if (!createdCat) {
      throw new Error("Error to create cat");
    }
    return cat;
  }

  public async list(): Promise<IResponseCreateCat[]> {
    const cats = await CatsModel.find();
    if (!cats) {
      return [];
    }
    return cats as unknown as IResponseCreateCat[];
  }
}
