import { CatInterface } from "../shared/interfaces/cat.interface";

export abstract class ICreateCatDTO implements CatInterface {
  abstract name: string;

  abstract age: number;

  abstract breed: string;
}
export interface IResponseCreateCat extends ICreateCatDTO {
  id: string;

  createdAt: Date;

  updatedAt: Date;
}
