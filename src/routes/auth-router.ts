import { Router } from "express";
import { CacheProvider } from "../providers/cache-provider";
import { CustomerRepository } from "../repositories/customer-repository";
import { AuthLoginUseCase } from "../use-cases/auth-login-use-case";
import { AuthLoginController } from "../controllers/auth-login-controller";

const router = Router();

const cacheProvider = new CacheProvider();

const customerRepository = new CustomerRepository(cacheProvider);

const authLoginUseCase = new AuthLoginUseCase(customerRepository);

const authLoginController = new AuthLoginController(authLoginUseCase);

router.post('/auth/login', (request, response) => authLoginController.handle(request, response));

export { router };