import * as base64 from 'base-64';
import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import gql from 'graphql-tag';

import logger from '../env/logger';
import { RelayMutation } from './GraphQLTypes';

const debug = logger('graphql');

export function loadSchemas() {
  const pattern = path.resolve(__dirname, 'schemas/*.graphql');
  const files = glob.sync(pattern);

  const typeDefs: any[] = [];

  files.forEach(f => {
    const name = path.basename(f).replace('.graphql', '');
    const content = fs.readFileSync(f, 'utf8');
    typeDefs.push(gql(content));
    debug(`Loaded graphql schema for '${name}'`);
  });

  return typeDefs;
}

function fromGlobalId(globalId: string) {
  return base64.decode(globalId).split(':')[1];
}

function toGlobalId(name: string, id: string) {
  return base64.encode(`${name}:${id}`);
}

export function toGlobalObject<T extends any>(name: string, result: T): T {
  return Object.assign({}, result, {
    id: toGlobalId(name, result.id)
  });
}

export function fromGlobalObject<T extends any>(input: T): T {
  return Object.assign({}, input, {
    id: fromGlobalId(input.id)
  });
}

export function mutationResult<T extends object>(input: RelayMutation, result: T): RelayMutation & T {
  return Object.assign({}, result, {
    clientMutationId: input.clientMutationId
  });
}

export function buildEdges(nodes: object[]) {
  return {
    edges: nodes.map(node => {
      return { node };
    })
  };
}
