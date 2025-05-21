import swaggerUi from "swagger-ui-express";
import swaggerSetup from "../docs/swagger";

import { Router } from "express";
import { router as HealthCheckRouter } from "./health-check-router";
import { router as AuthRouter } from './auth-router';
import { router as CustomerRouter } from "./customer-router";
import { router as ContactRouter } from './contact-router';

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
router.use(HealthCheckRouter);
router.use(AuthRouter);
router.use(CustomerRouter);
router.use(ContactRouter);

export { router };
