import Authorization from '../modules/Authorization';
import UserModel from '../models/User';
import User from './User';

import { toGlobalObject, mutationResult } from './GraphQLHelpers';
import { MResolver } from './GraphQLTypes';
import Resolvers from './Resolvers';

interface LoginInput {
  email: string;
  password: string;
}

interface AuthMutation {
  login: MResolver<LoginInput, object>;
}

const mutation: AuthMutation = {
  login: async (_, { input }) => {
    const { email, password } = input;
    const user = await UserModel.login(email, password);
    return mutationResult(input, {
      user: toGlobalObject(UserModel.modelName, user.toJSON()),
      token: await Authorization.generateToken({
        uid: user._id
      })
    });
  }
};

Resolvers.extendMutation(mutation);
