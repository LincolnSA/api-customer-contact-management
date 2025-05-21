import { ICacheProvider } from "../interfaces/cache-provider-interface";
import { ICacheDeleteDTO, ICacheGetDTO, ICacheSetDTO } from "../dtos/cache-dto";
import { redis } from "../libs/redis";

export class CacheProvider implements ICacheProvider {
  public async get(input: ICacheGetDTO): Promise<string | null> {
    const { key } = input;
    return await redis.get(key);
  }

  public async set(input: ICacheSetDTO): Promise<void> {
    const { key, value, ttl } = input;
    await redis.set(key, JSON.stringify(value), 'EX', ttl);
    return;
  }

  public async delete(input: ICacheDeleteDTO): Promise<void> {
    const { key } = input;
    await redis.del(key);
    return;
  }
}