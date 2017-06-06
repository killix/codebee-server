import User from '../models/user';

export const schema = require('./user.graphql');

export interface UserInput {
  name: string;
}

export const resolvers = {
  Query: {
    users: () => User.allUsers(),
    user: (_: any, {id}: {id: string}) => User.findById(id)
  },
  Mutation: {
    createUser: (_: any, {input}: {input: UserInput}) => {
      const user = new User(input.name);
      user.save();
      return user;
    },
    updateUser: (_: any, {id, input}: {id: string, input: UserInput}) => {
      const user = User.findById(id);
      user.name = input.name;
      user.save();
      return user;
    },
  }
};
