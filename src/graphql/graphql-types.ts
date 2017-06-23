export type QResolver3<O, A, C, R> = (obj: O, args: A, context: C) => Promise<R>;
export type QResolver2<O, A, R> = (obj: O, args: A) => Promise<R>;
export type QResolver1<O, R> = (obj: O) => Promise<R>;
export type QResolver0<R> = () => Promise<R>;

export type MResolver3<O, A, C, R> = QResolver3<O, { input: A }, C, R>;
export type MResolver2<O, A, R> = QResolver2<O, { input: A }, R>;
export type MResolver1<O, R> = QResolver1<O, R>;
export type MResolver0<R> = QResolver0<R>;

export interface RelayMutation {
  clientMutationId?: string;
}
