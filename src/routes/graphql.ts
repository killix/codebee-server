import * as bodyParser from 'body-parser';
import { Router, Request, Response, NextFunction } from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import getSchema from '../graphql/getSchema';
import Context from '../graphql/Context';

import { isEnabled } from '../env/Environment';
import Authorization, { TokenPayload } from '../modules/Authorization';
import Constants from '../env/Constants';
import { User, UserModel } from '../models/User';

async function loadUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies[Constants.ACCESS_TOKEN];
  let user: UserModel | null = null;
  if (token) {
    try {
      const decoded = await Authorization.decodeToken(token);
      res.locals.token = decoded;
      user = await User.findById(decoded.uid);
      if (!user) {
        res.clearCookie(Constants.ACCESS_TOKEN);
      }
    } catch (e) {
      return next(e);
    }
  }
  if (!user) {
    user = User.guest();
  }
  res.locals.user = user;
  next();
}

function csrf(req: Request, res: Response, next: NextFunction) {
  if (!isEnabled('CSRF'))
    return next();

  const user: UserModel = res.locals.user;
  if (user.isAuthenticated()) {
    const csrfHeader = req.headers[Constants.CSRF_HEADER] || req.query[Constants.CSRF_HEADER];
    const token: TokenPayload = res.locals.token;
    if (csrfHeader != token.csrf) {
      return next(new Error('Invalid csrf token'));
    }
  }
  next();
}

const api = Router();

api.post('/graphql', loadUser, csrf, graphqlExpress(async (req: Request, res: Response) => {
  return {
    schema: getSchema(),
    context: await Context.create(req, res)
  };
}));

api.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

export default api;
