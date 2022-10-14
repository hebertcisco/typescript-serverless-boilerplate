import { ICreateCatDTO } from "../dtos/ICreateCatDTO";

export interface CatInterface {
  name: string;
  age: number;
  breed: string;
}
export interface IResponseCreateCat extends ICreateCatDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
