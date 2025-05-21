import { prisma } from "../libs/prisma";
import { ICacheProvider } from "../interfaces/cache-provider-interface";
import { ICustomerRepository } from "../interfaces/customer-repository-interface";
import {
  CustomerCreateInputDTO,
  CustomerGetInputDTO,
  CustomerUpdateInputDTO,
  CustomerDeleteInputDTO,
  CustomerGetOutputDTO
} from "../dtos/customer-dto";
import { cacheKey, cacheTTL } from "../constants/cache-contant";

export class CustomerRepository implements ICustomerRepository {

  constructor(private readonly cacheProvider: ICacheProvider) { }

  public async create(input: CustomerCreateInputDTO) {
    const {
      name,
      cpf,
      email,
      phone,
      address,
    } = input;

    const output = await prisma.customer.create({
      data: {
        name,
        cpf,
        email,
        phone,
        address,
      }
    });

    await this.cacheProvider.set({
      key: cacheKey.customer(output.id),
      value: JSON.stringify(output),
      ttl: cacheTTL.customer
    });

    return output;
  }

  public async list() {
    const output = await prisma.customer.findMany();

    return output;
  }

  public async get(input: CustomerGetInputDTO): Promise<CustomerGetOutputDTO | null> {
    const { id } = input;

    const cache = await this.cacheProvider.get({ key: cacheKey.customer(id) });

    if (cache) {
      return JSON.parse(cache);
    }

    const output = await prisma.customer.findFirst({
      where: {
        id
      }
    });

    if (output) {
      await this.cacheProvider.set({
        key: cacheKey.customer(id),
        value: JSON.stringify(output),
        ttl: cacheTTL.customer
      });
    }

    return output;
  }

  public async update(input: CustomerUpdateInputDTO) {
    const {
      id,
      name,
      email,
      cpf,
      phone,
      address
    } = input;

    const output = await prisma.customer.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(cpf !== undefined ? { cpf } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(address !== undefined ? { address } : {}),
      }
    });

    await this.cacheProvider.delete({ key: cacheKey.customer(id) });

    return output;
  }

  public async delete(input: CustomerDeleteInputDTO) {
    const { id } = input;

    const output = await prisma.customer.delete({
      where: { id }
    });

    await this.cacheProvider.delete({ key: cacheKey.customer(id) });

    return output;
  }

  public async findByEmail(input: Pick<CustomerCreateInputDTO, "email">) {
    const { email } = input;

    const output = await prisma.customer.findFirst({
      where: { email }
    });

    return output;
  }

  public async findByCpf(input: Pick<CustomerCreateInputDTO, "cpf">) {
    const { cpf } = input;

    const output = await prisma.customer.findFirst({
      where: { cpf }
    });

    return output;
  }
}