import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";
import { AuthTokenInvalidError } from "../errors/auth-error";

export class AuthenticatedMiddleware {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { authorization } = request.headers;

      if (!authorization) {
        throw new AuthTokenInvalidError();
      }

      const [, token] = authorization.split(" ");

      if (!token) {
        throw new AuthTokenInvalidError();
      }

      const decoded = verify(token, env.JWT_SECRET_KEY) as { sub: string };

      if (!decoded.sub) {
        throw new AuthTokenInvalidError();
      }

      request.user = {
        id: decoded.sub
      };

      return next();
    } catch (error) {
      throw new AuthTokenInvalidError();
    }
  }
}