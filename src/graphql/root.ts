import Resolvers from './Resolvers';

const query = {
  hello: () => 'Hello!'
};

Resolvers.extendQuery(query);

Resolvers.extendMutation({
  hello: () => 'Hello!'
});

export default query;
