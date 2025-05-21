import { CacheProvider } from "./../../src/providers/cache-provider";
import { CustomerRepository } from "./../../src/repositories/customer-repository";
import { CustomerCreateUseCase } from "./../../src/use-cases/customer-create-use-case";
import { CustomerExistingEmailError, CustomerExistingCpfError } from "./../../src/errors/customer-error";

describe("CustomerCreateUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let customerCreateUseCase: CustomerCreateUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    customerRepository = new CustomerRepository(cacheProvider) as jest.Mocked<CustomerRepository>;
    customerRepository.create = jest.fn();
    customerRepository.findByEmail = jest.fn();
    customerRepository.findByCpf = jest.fn();

    customerCreateUseCase = new CustomerCreateUseCase(customerRepository);
  });

  it("should create a customer successfully", async () => {
    const input = {
      name: "Example",
      email: "example@gmail.com",
      cpf: "12345678900",
      phone: "12345678912",
      address: "example 123",
    };

    const customer = {
      ...input,
      id: "123",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    customerRepository.findByEmail.mockResolvedValue(null);
    customerRepository.findByCpf.mockResolvedValue(null);
    customerRepository.create.mockResolvedValue(customer);

    await expect(customerCreateUseCase.execute(input)).resolves.toHaveProperty("id")
  });

  it("should throw error if email exists", async () => {
    const input = {
      name: "Example",
      email: "example@gmail.com",
      cpf: "12345678900",
      phone: "12345678912",
      address: "example 123",
    };

    const customer = {
      ...input,
      id: "123",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    customerRepository.findByEmail.mockResolvedValue(customer);

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(CustomerExistingEmailError)
  });

  it("should throw error if cpf exists", async () => {
    const input = {
      name: "Example",
      email: "example@gmail.com",
      cpf: "12345678900",
      phone: "12345678912",
      address: "example 123",
    };

    const customer = {
      ...input,
      id: "123",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    customerRepository.findByEmail.mockResolvedValue(null);
    customerRepository.findByCpf.mockResolvedValue(customer);

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(CustomerExistingCpfError)
  });
});