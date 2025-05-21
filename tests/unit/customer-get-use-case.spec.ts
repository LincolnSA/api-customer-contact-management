import { CacheProvider } from "./../../src/providers/cache-provider";
import { CustomerRepository } from "./../../src/repositories/customer-repository";
import { CustomerGetUseCase } from "./../../src/use-cases/customer-get-use-case";
import { CustomerNotFoundError } from "./../../src/errors/customer-error";

describe("CustomerGetUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let customerGetUseCase: CustomerGetUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    customerRepository = new CustomerRepository(cacheProvider) as jest.Mocked<CustomerRepository>;
    customerRepository.get = jest.fn();

    customerGetUseCase = new CustomerGetUseCase(customerRepository);
  });

  it("should get a customer successfully", async () => {
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

    await expect(customerGetUseCase.execute(input)).resolves.toHaveProperty("id");
  });

  it("should throw error if customer not exists", async () => {
    const input = {
      id: "123",
    };

    customerRepository.get.mockResolvedValue(null);

    await expect(customerGetUseCase.execute(input)).rejects.toThrow(CustomerNotFoundError);
  });
});