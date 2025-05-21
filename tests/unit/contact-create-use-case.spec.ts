import { CacheProvider } from "./../../src/providers/cache-provider";
import { CustomerRepository } from "./../../src/repositories/customer-repository";
import { ContactRepository } from "./../../src/repositories/contact-repository";
import { ContactCreateUseCase } from "./../../src/use-cases/contact-create-use-case";
import { CustomerNotFoundError } from "./../../src/errors/customer-error";

describe("ContactCreateUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let contactRepository: jest.Mocked<ContactRepository>;
  let contactCreateUseCase: ContactCreateUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    customerRepository = new CustomerRepository(cacheProvider) as jest.Mocked<CustomerRepository>;
    customerRepository.get = jest.fn();

    contactRepository = new ContactRepository(cacheProvider) as jest.Mocked<ContactRepository>;
    contactRepository.create = jest.fn();

    contactCreateUseCase = new ContactCreateUseCase(customerRepository, contactRepository);
  });

  it("should create a contact successfully", async () => {
    const input = {
      customerId: "123",
      name: "Example",
      phone: "12345678912",
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

    const contact = {
      ...input,
      id: "123",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    customerRepository.get.mockResolvedValue(customer);

    contactRepository.create.mockResolvedValue(contact);

    await expect(contactCreateUseCase.execute(input)).resolves.toHaveProperty("id");
  });

  it("should throw error if customer not found", async () => {
    const input = {
      customerId: "123",
      name: "Example",
      phone: "12345678912",
    };

    customerRepository.get.mockResolvedValue(null);

    await expect(contactCreateUseCase.execute(input)).rejects.toThrow(CustomerNotFoundError);
  });
});