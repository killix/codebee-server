import Context from './Context';

export type QResolver<A, R> = (parent: any, args: A, context: Context) => Promise<R>;
export type MResolver<A, R> = QResolver<{ input: A }, R>;

export interface RelayMutation {
  clientMutationId?: string;
}
