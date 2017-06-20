import { mockgoose, initialize } from '../env/db';

export async function setupDb() {
  await initialize(true);
  await clearDb();
}

export async function clearDb() {
  if (!mockgoose.helper.isMocked()) {
    throw new Error('Unable to clear database: Mockgoose not applied');
  }
  await mockgoose.helper.reset();
}
