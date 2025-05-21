import { CacheProvider } from "./../../src/providers/cache-provider";
import { ContactRepository } from "./../../src/repositories/contact-repository";
import { ContactUpdateUseCase } from "./../../src/use-cases/contact-update-use-case";
import { ContactNotFoundError } from "./../../src/errors/contact-error";

describe("ContactUpdateUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let contactRepository: jest.Mocked<ContactRepository>;
  let contactDeleteUseCase: ContactUpdateUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    contactRepository = new ContactRepository(cacheProvider) as jest.Mocked<ContactRepository>;
    contactRepository.get = jest.fn();
    contactRepository.update = jest.fn();

    contactDeleteUseCase = new ContactUpdateUseCase(contactRepository);
  });

  it("should update a contact successfully", async () => {
    const input = {
      id: "123",
      customerId: "123",
      name: "Example",
      phone: "12345678912",
    };

    const contact = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    contactRepository.get.mockResolvedValue(contact);
    contactRepository.update.mockResolvedValue(contact);

    await expect(contactDeleteUseCase.execute(input)).resolves.toHaveProperty("id");
  });

  it("should throw error if customer not found", async () => {
    const input = {
      id: "123",
      customerId: "123",
    };

    contactRepository.get.mockResolvedValue(null);

    await expect(contactDeleteUseCase.execute(input)).rejects.toThrow(ContactNotFoundError);
  });
});