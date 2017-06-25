import * as dotenv from 'dotenv';

interface EnvironmentVars {
  NODE_ENV: string;
  DEBUG: string;
  MONGO_URI: string;
  PORT: string;
  MOCK_DB: string;
  JWT_SECRET: string;
  CSRF: string;
}

dotenv.config();

export function isTest() {
  return process.env.NODE_ENV == 'test';
}

export function isDev() {
  return !(isTest() || isProd());
}

export function isProd() {
  return process.env.NODE_ENV == 'production';
}

export function isEnabled(key: string) {
  return process.env[key] == 'true';
}

export function setEnv(key: string, value: string) {
  process.env[key] = value;
}

export const Environment = process.env as EnvironmentVars;

export default Environment;
