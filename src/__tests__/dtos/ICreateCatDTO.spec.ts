import { ICreateCatDTO } from "../../dtos/ICreateCatDTO";

describe("ICreateCatDTO", () => {
  class CreateCatImpl implements ICreateCatDTO {
    name: string;

    age: number;

    breed: string;
  }

  it("should be able to create a new cat", () => {
    const cat = new CreateCatImpl();
    cat.name = "John";
    cat.age = 2;
    cat.breed = "Persa";

    expect(cat).toHaveProperty("name");
    expect(cat).toHaveProperty("age");
    expect(cat).toHaveProperty("breed");
  });

  it("should not be able to create a new cat without name", () => {
    const cat = new CreateCatImpl();
    cat.age = 2;
    cat.breed = "Persa";

    expect(cat).not.toHaveProperty("name");
  });

  it("should not be able to create a new cat without age", () => {
    const cat = new CreateCatImpl();
    cat.name = "John";
    cat.breed = "Persa";

    expect(cat).not.toHaveProperty("age");
  });

  it("should not be able to create a new cat without breed", () => {
    const cat = new CreateCatImpl();
    cat.name = "John";
    cat.age = 2;

    expect(cat).not.toHaveProperty("breed");
  });
});
