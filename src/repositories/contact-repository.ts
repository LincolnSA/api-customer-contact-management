import { prisma } from "../libs/prisma";
import { IContactRepository } from "../interfaces/contact-repository-interface";
import { ICacheProvider } from "../interfaces/cache-provider-interface";
import {
  ContactCreateInputDTO,
  ContactGetInputDTO,
  ContactListInputDTO,
  ContactUpdateInputDTO,
  ContactDeleteInputDTO
} from "../dtos/contact-dto";
import { cacheKey, cacheTTL } from "../constants/cache-contant";

export class ContactRepository implements IContactRepository {

  constructor(private readonly cacheProvider: ICacheProvider) { }

  public async create(input: ContactCreateInputDTO) {
    const {
      name,
      phone,
      customerId
    } = input;

    const output = await prisma.contact.create({
      data: {
        name,
        phone,
        customerId,
      }
    });

    await this.cacheProvider.set({
      key: cacheKey.contact(output.id),
      value: JSON.stringify(output),
      ttl: cacheTTL.contact
    });

    return output;
  }

  public async list(input: ContactListInputDTO) {
    const { customerId } = input;

    const output = await prisma.contact.findMany({
      where: {
        customerId
      }
    });

    return output;
  }

  public async get(input: ContactGetInputDTO) {
    const { id, customerId } = input;

    const cache = await this.cacheProvider.get({ key: cacheKey.contact(id) });

    if (cache) {
      return JSON.parse(cache);
    }

    const output = await prisma.contact.findFirst({
      where: {
        id,
        customerId
      }
    });

    if (output) {
      await this.cacheProvider.set({
        key: cacheKey.contact(id),
        value: JSON.stringify(output),
        ttl: cacheTTL.contact
      });
    }

    return output;
  }

  public async update(input: ContactUpdateInputDTO) {
    const {
      id,
      name,
      phone,
      customerId,
    } = input;

    const output = await prisma.contact.update({
      where: {
        id,
        customerId
      },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(phone !== undefined ? { phone } : {}),
      }
    });

    await this.cacheProvider.delete({ key: cacheKey.contact(id) });

    return output;
  }

  public async delete(input: ContactDeleteInputDTO) {
    const { id, customerId } = input;

    const output = await prisma.contact.delete({
      where: { id, customerId }
    });

    await this.cacheProvider.delete({ key: cacheKey.contact(id) });

    return output;
  }
}