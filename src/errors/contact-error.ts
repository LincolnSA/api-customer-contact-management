import { StatusCodes } from "http-status-codes";
import { CustomErrorInterface } from "../interfaces/custom-error-interface";

export class ContactNotFoundError extends Error implements CustomErrorInterface {
  public readonly statusCode: StatusCodes;

  constructor() {
    super("Contato não encontrado");
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
