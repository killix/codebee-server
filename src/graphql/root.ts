import loadSchema from './loadSchema';
export const schema = loadSchema('root');

export const resolvers = {
  Query: {
    hello: () => 'Hello!'
  },
  Mutation: {
    hello: () => 'Hello!'
  }
};
