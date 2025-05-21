import { StatusCodes } from "http-status-codes";
import { CustomErrorInterface } from "../interfaces/custom-error-interface";

export class CustomerExistingCpfError extends Error implements CustomErrorInterface {
  public readonly statusCode: StatusCodes;

  constructor() {
    super("CPF já cadastrado");
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class CustomerExistingEmailError extends Error implements CustomErrorInterface {
  public readonly statusCode: StatusCodes;

  constructor() {
    super("Email já cadastrado");
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class CustomerNotFoundError extends Error implements CustomErrorInterface {
  public readonly statusCode: StatusCodes;

  constructor() {
    super("Cliente não encontrado");
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
