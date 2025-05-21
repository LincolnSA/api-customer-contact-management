import { CacheProvider } from "./../../src/providers/cache-provider";
import { ContactRepository } from "./../../src/repositories/contact-repository";
import { ContactDeleteUseCase } from "./../../src/use-cases/contact-delete-use-case";
import { ContactNotFoundError } from "./../../src/errors/contact-error";

describe("ContactDeleteUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let contactRepository: jest.Mocked<ContactRepository>;
  let contactDeleteUseCase: ContactDeleteUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    contactRepository = new ContactRepository(cacheProvider) as jest.Mocked<ContactRepository>;
    contactRepository.get = jest.fn();
    contactRepository.delete = jest.fn();

    contactDeleteUseCase = new ContactDeleteUseCase(contactRepository);
  });

  it("should delete a contact successfully", async () => {
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
    contactRepository.delete.mockResolvedValue(contact);

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