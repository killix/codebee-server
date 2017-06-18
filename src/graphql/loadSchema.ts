import * as assert from 'assert';
import * as fs from 'fs';
import * as glob from 'glob';
import gql from 'graphql-tag';
import * as path from 'path';

import logger from '../env/debug';

const debug = logger('loadSchema');

const schemas = new Map<string, any>();

const pattern = path.resolve(__dirname, 'schemas/*.graphql');
const files = glob.sync(pattern);

files.forEach(f => {
  const name = path.basename(f).replace('.graphql', '');
  const content = fs.readFileSync(f, 'utf8');
  schemas.set(name, gql(content));
  debug(`Loaded graphql schema for '${name}'`);
});

export default function loadSchema(name: string) {
  assert.ok(schemas.has(name), `Missing graphql schema for ${name}`);
  return schemas.get(name);
}
