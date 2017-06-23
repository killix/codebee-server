import { isUndefined } from 'lodash';
import { Mockgoose } from 'mockgoose';
import * as mongoose from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment';

import logger from './logger';
import Environment, { isTest } from './Environment';

const debug = logger('mongodb');

export let mockgoose: Mockgoose;

export async function initialize(mock?: boolean) {
  const uri = Environment.MONGO_URI;

  if (isUndefined(mock)) {
    mock = isTest() || Environment.MOCK_DB == 'true';
  }

  try {
    if (mock) {
      mockgoose = new Mockgoose(mongoose);
      await mockgoose.prepareStorage();
      debug('Using mock database with mockgoose');
    }

    (mongoose as any).Promise = global.Promise;
    await mongoose.connect(uri);
  } catch (e) {
    debug(`Error connecting to MongoDB at ${uri}`);
    throw e;
  }

  debug(`Connected to MongoDB at ${uri}`);
  autoIncrement.initialize(mongoose.connection);
}
