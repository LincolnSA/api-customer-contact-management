import { CacheProvider } from "./../../src/providers/cache-provider";
import { CustomerRepository } from "./../../src/repositories/customer-repository";
import { CustomerUpdateUseCase } from "./../../src/use-cases/customer-update-use-case";
import { CustomerExistingEmailError, CustomerExistingCpfError } from "./../../src/errors/customer-error";

describe("CustomerUpdateUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let customerUpdateUseCase: CustomerUpdateUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    customerRepository = new CustomerRepository(cacheProvider) as jest.Mocked<CustomerRepository>;
    customerRepository.get = jest.fn();
    customerRepository.findByEmail = jest.fn();
    customerRepository.findByCpf = jest.fn();
    customerRepository.update = jest.fn();

    customerUpdateUseCase = new CustomerUpdateUseCase(customerRepository);
  });

  it("should update a customer successfully", async () => {
    const input = {
      id: "123",
      name: "Example",
      email: "example@gmail.com",
      cpf: "12345678900",
      phone: "12345678912",
      address: "example 123",
    };

    const customer = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    customerRepository.get.mockResolvedValue(customer);
    customerRepository.findByEmail.mockResolvedValue(customer);
    customerRepository.findByCpf.mockResolvedValue(customer);
    customerRepository.update.mockResolvedValue(customer);

    await expect(customerUpdateUseCase.execute(input)).resolves.toHaveProperty("id")
  });

  it("should throw error if email exists", async () => {
    const input = {
      id: "123",
      name: "Example",
      email: "example@gmail.com",
      cpf: "12345678900",
      phone: "12345678912",
      address: "example 123",
    };

    const customer = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    customerRepository.get.mockResolvedValue({
      ...customer,
      email: "example2@gmail.com",
      id: "1234"
    });
    customerRepository.findByEmail.mockResolvedValue({
      ...customer,
      id: "12345"
    });

    await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(CustomerExistingEmailError);
  });

  it("should throw error if cpf exists", async () => {
    const input = {
      id: "123",
      name: "Example",
      email: "example@gmail.com",
      cpf: "12345678900",
      phone: "12345678912",
      address: "example 123",
    };

    const customer = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    customerRepository.get.mockResolvedValue({
      ...customer,
      cpf: "12345678901",
      id: "1234"
    });
    customerRepository.findByEmail.mockResolvedValue(customer);
    customerRepository.findByCpf.mockResolvedValue({
      ...customer,
      id: "12345"
    });

    await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(CustomerExistingCpfError);
  });
});