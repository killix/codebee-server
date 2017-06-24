import { Request, Response } from 'express';
import { omit } from 'lodash';

import Constants from '../env/Constants';
import Authorization from '../modules/Authorization';
import { User, UserModel } from '../models/User';

export default class Context {
  private req: Request;
  private res: Response;

  user: UserModel;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  static async create(req: Request, res: Response) {
    const context = new Context(req, res);
    await context.initialize();
    return context;
  }

  async initialize() {
    const token = this.req.cookies[Constants.ACCESS_TOKEN];
    if (token) {
      const decoded = await Authorization.decodeToken(token);
      this.user = await User.findById(decoded.uid);
    } else {
      this.user = User.guest();
    }
  }

  toString() {
    return JSON.stringify(omit(this, 'req', 'res'));
  }

  setAccessToken(token: string) {
    this.res.cookie(Constants.ACCESS_TOKEN, token, {
      httpOnly: true
    });
  }
}
