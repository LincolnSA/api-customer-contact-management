import { CacheProvider } from "../../src/providers/cache-provider";
import { CustomerRepository } from "../../src/repositories/customer-repository";
import { CustomerDeleteUseCase } from "../../src/use-cases/customer-delete-use-case";
import { CustomerNotFoundError } from "../../src/errors/customer-error";

describe("CustomerDeleteUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let customerDeleteUseCase: CustomerDeleteUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    customerRepository = new CustomerRepository(cacheProvider) as jest.Mocked<CustomerRepository>;
    customerRepository.get = jest.fn();
    customerRepository.delete = jest.fn();

    customerDeleteUseCase = new CustomerDeleteUseCase(customerRepository);
  });

  it("should delete a customer successfully", async () => {
    const input = {
      id: "123",
    };

    const customer = {
      id: "123",
      name: "Example",
      email: "example@gmail.com",
      cpf: "12345678900",
      phone: "12345678912",
      address: "example 123",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    customerRepository.get.mockResolvedValue(customer);
    customerRepository.delete.mockResolvedValue(customer);

    await expect(customerDeleteUseCase.execute(input)).resolves.toHaveProperty("id");
  });

  it("should throw error if customer not exists", async () => {
    const input = {
      id: "123",
    };

    customerRepository.get.mockResolvedValue(null);

    await expect(customerDeleteUseCase.execute(input)).rejects.toThrow(CustomerNotFoundError);
  });
});