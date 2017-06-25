import { Request, Response } from 'express';
import { omit } from 'lodash';

import Constants from '../env/Constants';
import { User, UserModel } from '../models/User';

export default class Context {
  private req: Request;
  private res: Response;

  user: UserModel;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;

    this.user = res.locals.user;
  }

  static async create(req: Request, res: Response) {
    const context = new Context(req, res);
    await context.initialize();
    return context;
  }

  async initialize() {

  }

  toString() {
    return JSON.stringify(omit(this, 'req', 'res'));
  }

  setAccessToken(token: string) {
    this.res.cookie(Constants.ACCESS_TOKEN, token, {
      httpOnly: true
    });
  }

  setCsrf(token: string) {
    this.res.setHeader(Constants.CSRF_HEADER, token);
  }
}
