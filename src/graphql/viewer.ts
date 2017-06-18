import { merge } from 'lodash';

import { resolvers as userResolvers } from './user';

import loadSchema from './loadSchema';
export const schema = loadSchema('viewer');

const viewerResolvers = {
  hello: () => 'Hello viewer!',
  hello2: () => 'Hello viewer 2!',
  users: () => userResolvers.Query.users(),
  users2: async () => {
    return {
      edges: (await userResolvers.Query.users()).map(user => {
        return { node: user };
      })
    };
  }
};

export const resolvers = {
  Query: {
    viewer: () => viewerResolvers // merge.call(null, viewerResolvers, userResolvers.Query)
  }
};
