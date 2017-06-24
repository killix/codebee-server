import Authorization from '../modules/Authorization';
import User, { UserModel } from '../models/User';
import { isProd } from '../env/Environment';

import { toGlobalObject, mutationResult } from './GraphQLHelpers';
import { MResolver, RelayMutation } from './GraphQLTypes';
import Context from './Context';
import Resolvers from './Resolvers';

interface RegisterInput {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthMutation {
  register: MResolver<RegisterInput, object>;
  login: MResolver<LoginInput, object>;
}

async function authPayload(input: RelayMutation, user: UserModel, context: Context) {
  const token = await Authorization.generateToken({
    uid: user._id
  });
  context.setAccessToken(token);

  return mutationResult(input, {
    user: toGlobalObject(User.modelName, user.toJSON()),
    token: isProd() ? null : token
  });
}

const mutation: AuthMutation = {
  register: async (parent, args, context) => {
    const input = args.input;
    const user = await User.register(input);
    return authPayload(input, user, context);
  },
  login: async (parent, args, context) => {
    const input = args.input;
    const { email, password } = input;
    const user = await User.login(email, password);
    return authPayload(input, user, context);
  }
};

Resolvers.extendMutation(mutation);
