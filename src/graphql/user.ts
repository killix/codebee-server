import { omit } from 'lodash';

import User from '../models/user';

import { resolvers as viewerResolvers } from './viewer';

import loadSchema from './loadSchema';
export const schema = loadSchema('user');

export interface UserInput {
  name: string;
  clientMutationId: string;
}

export interface UpdateUserInput {
  id: string;
  name: string;
  clientMutationId: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  username: string;
  password: string;
  clientMutationId?: string;
}

interface Resolver<Q, M> {
  Query: Q
  Mutation: M
}

interface UserQuery {

}

interface UserMutation {

}

type UserResolver = Resolver<UserQuery, UserMutation>;

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
      return {
        user: user.toJSON(),
        clientMutationId: input.clientMutationId
      };
    },
    // Registration
    registerUser: async(_: any, {input}: {input: RegisterUserInput}) => {
      const user = await User.register(input);
      return {
        user: user.toJSON(),
        clientMutationId: input.clientMutationId
      };
    }
  }
};
