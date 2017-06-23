import { Document, Schema } from 'mongoose';
import { plugin as autoIncrementPlugin } from 'mongoose-auto-increment';

import { isTest } from '../env/Environment';

export function setupSchema(schema: Schema) {
  schema.set('toJSON', {
    id: true,
    getters: true,
    versionKey: false,
    transform: (_: any, ret: Document) => {
      delete ret._id;
      return ret;
    }
  });
}

export function autoIncrement(model: string, schema: Schema) {
  if (isTest())
    return;

  schema.plugin(autoIncrementPlugin, {
    model: model,
    startAt: 1
  });
}
