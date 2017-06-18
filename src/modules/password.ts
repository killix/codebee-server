import bcrypt from 'bcryptjs';
import crypto from 'crypto';

function sha256(s: string) {
  return crypto.createHash('sha256').update(s).digest('base64');
}

async function hash(password: string) {
  return await bcrypt.hash(sha256(password), 10);
}

export async function validatePassword(password: string, hash: string) {
  return await bcrypt.compare(sha256(password), hash);
}

export async function hashPassword(password: string) {
  return await hash(password);
}
