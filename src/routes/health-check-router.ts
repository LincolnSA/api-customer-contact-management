// src/routes/health-check-router.ts
import { Router } from "express";
import { HealthCheckController } from "../controllers/health-check-controller";

const router = Router();

const healthCheckController = new HealthCheckController();

router.get("/health-check", healthCheckController.handle);

export { router };