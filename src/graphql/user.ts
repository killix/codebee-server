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
    users: () => User.allUsers(),
    user: (_: any, {id}: {id: string}) => User.findById(id)
  },
  Mutation: {
    createUser: (_: any, {input}: {input: UserInput}) => {
      const user = new User(input.name);
      user.save();
      return {
        user: user,
        viewer: viewerResolvers.Query.viewer(),
        clientMutationId: input.clientMutationId
      };
    },
    updateUser: (_: any, {input}: {input: UpdateUserInput}) => {
      const { id, name } = input;
      const user = User.findById(id);
      user.name = name;
      user.save();
      return Object.assign({}, user, {clientMutationId: input.clientMutationId});
    },
  }
};
