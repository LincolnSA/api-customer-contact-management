import express from "express";
import winston from "winston";
import expressWinston from "express-winston";
import { env } from "../env";

const originalJson = express.response.json;

express.response.json = function (body: any) {
  (this as any)._responseBody = body;
  return originalJson.call(this, body);
};

const originalSend = express.response.send;

express.response.send = function (body: any) {
  (this.req as any)._startTime = Date.now();
  return originalSend.call(this, body);
};

const {
  combine,
  timestamp,
  printf,
  colorize,
  json
} = winston.format;

const customFormat = printf((input) => {
  const { level, message, timestamp, ...metadata } = input;

  let output = `${timestamp} [${level}] : ${message}`;

  if (Object.keys(metadata).length > 0) {
    output += ` ${JSON.stringify(metadata)}`;
  }

  return output;
});

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json(),
    customFormat
  ),
  defaultMeta: {
    app: {
      name: env.APP_NAME,
      version: process.env.npm_package_version || '1.0.0',
      environment: env.NODE_ENV,
    }
  },
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      )
    })
  ]
});

export const expressLogger = expressWinston.logger({
  level: "info",
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  colorize: false,
  dynamicMeta: (req, res) => {
    return {
      responseTime: undefined, // Date.now() - (req as any)._startTime
      request: {
        method: req.method,
        url: req.url,
        headers: {
          host: req.headers.host,
          origin: req.headers.origin,
          referer: req.headers.referer
        },
        query: req.query,
        params: req.params,
        body: req.method !== 'GET' ? req.body : undefined
      },
      response: {
        status: res.statusCode,
        body: (res as any)._responseBody
      },
      client: {
        ip: req.ip,
        userId: req.user?.id
      }
    };
  },
  ignoreRoute: function (req, res) { return false; },
  metaField: null,
  requestWhitelist: [],
  responseWhitelist: []
});

export const expressErrorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
  level: "error",
  meta: true,
  msg: "{{err.message}}",
  dynamicMeta: (req, res) => {
    return {
      responseTime: undefined, // Date.now() - (req as any)._startTime
      request: {
        method: req.method,
        url: req.url,
        headers: {
          host: req.headers.host,
          origin: req.headers.origin,
          referer: req.headers.referer
        },
        query: req.query,
        params: req.params,
        body: req.method !== 'GET' ? req.body : undefined
      },
      response: {
        status: res.statusCode,
        body: (res as any)._responseBody
      },
      client: {
        ip: req.ip,
        userId: req.user?.id
      }
    };
  }
});