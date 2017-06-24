import { omit } from 'lodash';

import User from '../models/User';

import { toGlobalObject, mutationResult, fromGlobalObject } from './GraphQLHelpers';
import { QResolver, MResolver } from './GraphQLTypes';
import Resolvers from './Resolvers';

interface UpdateUserInput {
  id: string;
  name: string;
}

interface RegisterUserInput {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface UserQuery {
  users: QResolver<void, object[]>;
  user: QResolver<{ id: string }, object>;
}

interface UserMutation {
  updateUser: MResolver<UpdateUserInput, object>;
  registerUser: MResolver<RegisterUserInput, object>;
}

const NAME = User.modelName;

const query: UserQuery = {
  users: async (_, args, context) => (await User.find()).map(u => toGlobalObject(NAME, u.toJSON())),
  user: async (_, { id }) => toGlobalObject(NAME, (await User.findById(id)).toJSON())
};

const mutation: UserMutation = {
  updateUser: async (_, { input }) => {
    const { id, name } = fromGlobalObject(input);
    const user = await User.findByIdAndUpdate(id, { name }, { new: true });
    return mutationResult(input, {
      user: toGlobalObject(NAME, user.toJSON())
    });
  },
  registerUser: async (_, { input }) => {
    const user = await User.register(input);
    return mutationResult(input, {
      user: toGlobalObject(NAME, user.toJSON()),
    });
  }
};

Resolvers.extendMutation(mutation);

export default query;
