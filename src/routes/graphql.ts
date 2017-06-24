import * as bodyParser from 'body-parser';

import { Router } from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import * as test from 'graphql-server-core';

import getSchema from '../graphql/getSchema';

const api = Router();

api.use('/graphql', bodyParser.json(), graphqlExpress({ schema: getSchema() }));
api.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

export default api;
