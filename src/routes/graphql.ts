import * as bodyParser from 'body-parser';

import { Router } from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import schema from '../graphql/schema';

const api = Router();

api.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));
api.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

export default api;
