import { merge } from 'lodash';

const query = {};
const mutation = {};

function extendQuery(queryResolvers: object) {
  merge(query, queryResolvers);
}

function extendMutation(mutationResolvers: object) {
  merge(mutation, mutationResolvers);
}

function getResolvers() {
  return {
    Query: query,
    Mutation: mutation
  };
}

const Resolvers = {
  extendQuery,
  extendMutation,
  getResolvers
};

export default Resolvers;
