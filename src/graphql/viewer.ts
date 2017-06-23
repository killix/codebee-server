import { buildEdges } from './graphql-helpers';
import Resolvers from './Resolvers';
import User from './user';

const query = {
  users: async () => buildEdges(await User.users())
};

Resolvers.extendQuery({
  viewer: () => query
});

export default query;
