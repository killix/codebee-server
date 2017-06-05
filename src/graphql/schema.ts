import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { schema as rootSchema, resolvers as rootResolvers } from './root';
import { schema as userSchema, resolvers as userResolvers } from './user';

const typeDefs = [rootSchema, userSchema];
const resolvers = [rootResolvers, userResolvers];

export default makeExecutableSchema({
  typeDefs,
  resolvers: merge.apply(null, resolvers),
  allowUndefinedInResolve: false
});
