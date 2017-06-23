import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { loadSchemas } from './graphql-helpers';
import Resolvers from './Resolvers';

import './root';
import './user';
import './viewer';

export default () => makeExecutableSchema({
  typeDefs: loadSchemas(),
  resolvers: Resolvers.getResolvers(),
  allowUndefinedInResolve: false
});
