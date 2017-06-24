import { makeExecutableSchema } from 'graphql-tools';

import { loadSchemas } from './GraphQLHelpers';
import Resolvers from './Resolvers';

import './Auth';
import './Root';
import './User';
import './Viewer';

export default () => makeExecutableSchema({
  typeDefs: loadSchemas(),
  resolvers: Resolvers.getResolvers(),
  allowUndefinedInResolve: false
});
