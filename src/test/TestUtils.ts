import { clearDb, setupDb } from './Database';

export async function setupTest() {
  await setupDb();
}

export async function clearDatabase() {
  await clearDb();
}
