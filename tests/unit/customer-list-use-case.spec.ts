import { CacheProvider } from "./../../src/providers/cache-provider";
import { CustomerRepository } from "./../../src/repositories/customer-repository";
import { CustomerListUseCase } from "./../../src/use-cases/customer-list-use-case";

describe("CustomerListUseCase", () => {
  let cacheProvider: jest.Mocked<CacheProvider>;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let customerListUseCase: CustomerListUseCase;

  beforeEach(() => {
    cacheProvider = new CacheProvider() as jest.Mocked<CacheProvider>;

    customerRepository = new CustomerRepository(cacheProvider) as jest.Mocked<CustomerRepository>;
    customerRepository.list = jest.fn();

    customerListUseCase = new CustomerListUseCase(customerRepository);
  });

  it("should list customers successfully", async () => {
    customerRepository.list.mockResolvedValue([]);

    await expect(customerListUseCase.execute()).resolves.toEqual([]);
  });
});