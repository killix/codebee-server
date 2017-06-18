import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { schema as rootSchema, resolvers as rootResolvers } from './root';
import { schema as userSchema, resolvers as userResolvers } from './user';
import { schema as viewerSchema, resolvers as viewerResolvers } from './viewer';

import loadSchema from './loadSchema';
const commonSchema = loadSchema('common');

const typeDefs = [commonSchema, rootSchema, userSchema, viewerSchema];
const resolvers = [rootResolvers, userResolvers, viewerResolvers];

console.log(merge.apply(null, resolvers));

export default makeExecutableSchema({
  typeDefs,
  resolvers: merge.apply(null, resolvers),
  allowUndefinedInResolve: false
});
