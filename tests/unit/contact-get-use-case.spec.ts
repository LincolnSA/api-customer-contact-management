import { CacheProvider } from "./../../src/providers/cache-provider";
import { ContactRepository } from "./../../src/repositories/contact-repository";
import { ContactGetUseCase } from "./../../src/use-cases/contact-get-use-case";
import { ContactNotFoundError } from "./../../src/errors/contact-error";

describe("ContactGetUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let contactRepository: jest.Mocked<ContactRepository>;
  let contactGetUseCase: ContactGetUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    contactRepository = new ContactRepository(cacheProvider) as jest.Mocked<ContactRepository>;
    contactRepository.get = jest.fn();

    contactGetUseCase = new ContactGetUseCase(contactRepository);
  });

  it("should get a contact successfully", async () => {
    const input = {
      id: "123",
      customerId: "123",
    };

    const contact = {
      ...input,
      name: "Example",
      phone: "12345678912",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    contactRepository.get.mockResolvedValue(contact);

    await expect(contactGetUseCase.execute(input)).resolves.toHaveProperty("id");
  });

  it("should throw error if customer not found", async () => {
    const input = {
      id: "123",
      customerId: "123",
    };

    contactRepository.get.mockResolvedValue(null);

    await expect(contactGetUseCase.execute(input)).rejects.toThrow(ContactNotFoundError);
  });
});