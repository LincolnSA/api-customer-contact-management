export interface ContactCreateInputDTO {
  customerId: string;
  name: string;
  phone: string;
}

export interface ContactGetInputDTO {
  customerId: string;
  id: string;
}

export interface ContactListInputDTO {
  customerId: string;
}

export interface ContactUpdateInputDTO {
  customerId: string;
  id: string;
  name?: string;
  phone?: string;
}

export interface ContactDeleteInputDTO {
  customerId: string;
  id: string;
}
