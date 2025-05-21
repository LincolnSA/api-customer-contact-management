export interface ICacheGetDTO {
  key: string;
}

export interface ICacheSetDTO {
  key: string;
  value: string;
  ttl: number;
}

export interface ICacheDeleteDTO {
  key: string;
}