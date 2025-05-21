import { z } from "zod";

const schema = z.object({
  APP_NAME: z.string(),
  APP_PORT: z.string().transform(port => Number(port)),
  APP_HOST: z.string().ip(),
  DATABASE_URL: z.string().url(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  LOG_LEVEL: z.enum(["error", "warn", "info", "http", "verbose", "debug", "silly"]).default("info"),
  NODE_ENV: z.enum(["development", "homolog", "production", "test"]).default("development"),
  JWT_SECRET_KEY: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(port => Number(port)),
  REDIS_PASSWORD: z.string(),
});

export const env = schema.parse(process.env);