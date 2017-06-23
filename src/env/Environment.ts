import * as dotenv from 'dotenv';

interface EnvironmentVars {
  NODE_ENV: string;
  DEBUG: string;
  MONGO_URI: string;
  PORT: string;
  MOCK_DB: string;
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

export default process.env as EnvironmentVars;
