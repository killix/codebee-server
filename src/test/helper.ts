import { clearDb, setupDb } from './db';

export async function setupTest() {
  await setupDb();
}

export async function clearDatabase() {
  await clearDb();
}
