import { CatInterface } from "../../../shared/interfaces/cat.interface";
describe("CatInterface", () => {
  class CatImpl implements CatInterface {
    name: string;
    age: number;
    breed: string;
  }

  it("should be able to create a new cat", async () => {
    const cat = new CatImpl();
    cat.name = "John";
    cat.age = 2;
    cat.breed = "Persa";
    expect(cat).toBeDefined();
  });

  it("should not be able to create a new cat without name", async () => {
    const cat = new CatImpl();
    cat.age = 2;
    cat.breed = "Persa";
    expect(cat).toBeDefined();
  });
});
