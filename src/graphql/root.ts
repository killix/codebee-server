import Resolvers from './Resolvers';

Resolvers.extendQuery({
  hello: () => 'Hello!'
});

Resolvers.extendMutation({
  hello: () => 'Hello!'
});
