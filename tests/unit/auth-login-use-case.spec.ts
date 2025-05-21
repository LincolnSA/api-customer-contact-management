import { CacheProvider } from "./../../src/providers/cache-provider";
import { CustomerRepository } from "./../../src/repositories/customer-repository";
import { AuthLoginUseCase } from "./../../src/use-cases/auth-login-use-case";
import { CustomerNotFoundError } from "./../../src/errors/customer-error";

describe("AuthLoginUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let authLoginUseCase: AuthLoginUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    customerRepository = new CustomerRepository(cacheProvider) as jest.Mocked<CustomerRepository>;
    customerRepository.findByEmail = jest.fn();

    authLoginUseCase = new AuthLoginUseCase(customerRepository);
  });

  it("should return token if successfully", async () => {
    const input = {
      email: "example@gmail.com"
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

    customerRepository.findByEmail.mockResolvedValue(customer);

    await expect(authLoginUseCase.execute(input)).resolves.toHaveProperty("token")
  });

  it("should throw erro if customer not found", async () => {
    const input = {
      email: "example@gmail.com"
    };

    customerRepository.findByEmail.mockResolvedValue(null);

    await expect(authLoginUseCase.execute(input)).rejects.toThrow(CustomerNotFoundError)
  });
});