import { once } from 'lodash';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import { loadSchemas } from './GraphQLHelpers';
import Resolvers from './Resolvers';

import './Auth';
import './Root';
import './User';
import './Viewer';

let schema: GraphQLSchema;

const makeSchema = once(() => {
  schema = makeExecutableSchema({
    typeDefs: loadSchemas(),
    resolvers: Resolvers.getResolvers(),
    allowUndefinedInResolve: false
  });
});

export default function getSchema() {
  makeSchema();
  return schema;
}
