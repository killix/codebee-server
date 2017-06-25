import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid/v4';
import { promisify } from 'util';

import Environment from '../env/Environment';

export interface TokenPayload {
  uid: string;
  csrf?: string;
}

const JWT_SECRET = () => Environment.JWT_SECRET;

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

export async function generateToken(payload: TokenPayload) {
  return sign(payload, JWT_SECRET(), {
    expiresIn: '7d'
  });
}

export async function decodeToken(token: string) {
  return verify(token, JWT_SECRET()) as TokenPayload;
}

export function generateCsrfToken() {
  return uuid();
}

export default {
  generateToken,
  decodeToken,
  generateCsrfToken
};
