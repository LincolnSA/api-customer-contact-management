import { StatusCodes } from "http-status-codes";
import { CustomErrorInterface } from "../interfaces/custom-error-interface";

export class AuthTokenInvalidError extends Error implements CustomErrorInterface {
  public readonly statusCode: StatusCodes;

  constructor() {
    super("Token inválido");
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}