export const schema = require('./root.graphql');

export const resolvers = {
  Query: {
    hello: () => 'Hello!'
  },
  Mutation: {
    hello: () => 'Hello!'
  }
};
