import { buildEdges } from './GraphQLHelpers';
import { QResolver } from './GraphQLTypes';
import Resolvers from './Resolvers';
import User from './User';

interface ViewerQuery {
  users: QResolver<void, object>;
}
const query: ViewerQuery = {
  users: async (_, args, context) => buildEdges(await User.users(_, args, context))
};

Resolvers.extendQuery({
  viewer: () => query
});

export default query;
