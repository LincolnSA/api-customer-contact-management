import { StatusCodes } from "http-status-codes";
import { CustomErrorInterface } from "../interfaces/custom-error-interface";
import { ZodError } from "zod";

export class ValidationError extends Error implements CustomErrorInterface {
  public readonly statusCode: StatusCodes;
  public readonly errors: Array<{ field: string; message: string }>;

  constructor(errors: Array<{ field: string; message: string }>) {
    super("Erro de validação");
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.errors = errors;
  }

  public static fromZodError(zodError: ZodError): ValidationError {
    const errors = zodError.errors.map(error => ({
      field: error.path.join('.'),
      message: error.message.toLowerCase()
    }));

    return new ValidationError(errors);
  }
} 