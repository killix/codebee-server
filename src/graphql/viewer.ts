import { buildEdges } from './GraphQLHelpers';
import Resolvers from './Resolvers';
import User from './User';

const query = {
  users: async () => buildEdges(await User.users())
};

Resolvers.extendQuery({
  viewer: () => query
});

export default query;
