import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomErrorInterface } from "../interfaces/custom-error-interface";
import { ValidationError } from "../errors/validation-error";
import { logger } from "../libs/logger";

export class ErrorHandlerMiddleware {
  public async handle(
    error: CustomErrorInterface,
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const statusCode = error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    let responseBody: any = {
      message: error?.statusCode ? error.message : "Erro interno do servidor",
    };

    if (error instanceof ValidationError) {
      responseBody = {
        message: error.message,
        errors: error.errors
      };
    }

    logger.error("Erro na aplicação", {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        status: error.statusCode
      },
      request: {
        method: request.method,
        url: request.url,
        params: request.params,
        query: request.query,
        body: request.body
      },
      response: {
        status: statusCode,
        body: responseBody
      }
    });

    return response.status(statusCode).json(responseBody);
  }
}