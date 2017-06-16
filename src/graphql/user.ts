import User from '../models/user';

import { resolvers as viewerResolvers } from './viewer';

export interface UserInput {
  name: string;
  clientMutationId: string;
}

export interface UpdateUserInput {
  id: string;
  name: string;
  clientMutationId: string;
}

export const schema = require('./user.graphql');

export const resolvers = {
  Query: {
    users: async () => (await User.find()).map(u => u.toJSON()),
    user: async (_: any, {id}: {id: string}) => (await User.findById(id)).toJSON()
  },
  Mutation: {
    createUser: async (_: any, {input}: {input: UserInput}) => {
      const user = await User.create({ name: input.name });
      return {
        user: user.toJSON(),
        viewer: viewerResolvers.Query.viewer(),
        clientMutationId: input.clientMutationId
      };
    },
    updateUser: async (_: any, {input}: {input: UpdateUserInput}) => {
      const { id, name } = input;
      const user = await User.findByIdAndUpdate(id, { name });
      return Object.assign(user.toJSON(), { clientMutationId: input.clientMutationId });
    },
  }
};
