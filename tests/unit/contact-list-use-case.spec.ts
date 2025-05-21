import { CacheProvider } from "./../../src/providers/cache-provider";
import { ContactRepository } from "./../../src/repositories/contact-repository";
import { ContactListUseCase } from "./../../src/use-cases/contact-list-use-case";

describe("ContactListUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let contactRepository: jest.Mocked<ContactRepository>;
  let contactGetUseCase: ContactListUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    contactRepository = new ContactRepository(cacheProvider) as jest.Mocked<ContactRepository>;
    contactRepository.list = jest.fn();

    contactGetUseCase = new ContactListUseCase(contactRepository);
  });

  it("should list contacts successfully", async () => {
    const input = {
      id: "123",
      customerId: "123",
    };

    contactRepository.list.mockResolvedValue([]);

    await expect(contactGetUseCase.execute(input)).resolves.toEqual([]);
  });
});