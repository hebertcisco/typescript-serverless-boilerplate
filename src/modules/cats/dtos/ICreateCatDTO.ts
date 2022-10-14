import { CatInterface } from "../interfaces/cat.interface";

export abstract class ICreateCatDTO implements CatInterface {
  abstract name: string;
  abstract age: number;
  abstract breed: string;
}
