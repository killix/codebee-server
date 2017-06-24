import { Request, Response } from 'express';

export type QResolver<A, R> = (parent: any, args: A, context: Context) => Promise<R>;
export type MResolver<A, R> = QResolver<{ input: A }, R>;

export interface Context {
  req: Request,
  res: Response
}

export interface RelayMutation {
  clientMutationId?: string;
}
