import * as bodyParser from 'body-parser';

import { Router, Request, Response } from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import getSchema from '../graphql/getSchema';
import Context from '../graphql/Context';

const api = Router();

api.use('/graphql', bodyParser.json(), graphqlExpress(async (req: Request, res: Response) => {
  return {
    schema: getSchema(),
    context: await Context.create(req, res)
  };
}));

api.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

export default api;
