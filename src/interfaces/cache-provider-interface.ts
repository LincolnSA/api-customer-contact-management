import { ICacheGetDTO, ICacheSetDTO, ICacheDeleteDTO } from "../dtos/cache-dto";

export interface ICacheProvider {
  get(input: ICacheGetDTO): Promise<string | null>;
  set(input: ICacheSetDTO): Promise<void>;
  delete(input: ICacheDeleteDTO): Promise<void>;
}