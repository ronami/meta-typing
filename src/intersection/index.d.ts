import { Tail, Head, Push, Exists } from '..';

export type intersection<
  A extends Array<any>,
  B extends Array<any>,
  R extends Array<any> = []
> = {
  0: R;
  // @ts-ignore
  1: intersection<Tail<A>, B, Push<R, Head<A>>>;
  2: intersection<Tail<A>, B, R>;
}[A extends [] ? 0 : Exists<B, Head<A>> extends false ? 2 : 1];
