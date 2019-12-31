import { Tail, Head, Unshift, Includes, Reverse } from '..';

export type intersection<
  A extends Array<any>,
  B extends Array<any>,
  R extends Array<any> = []
> = {
  0: Reverse<R>;
  1: intersection<Tail<A>, B, Unshift<R, Head<A>>>;
  2: intersection<Tail<A>, B, R>;
}[A extends [] ? 0 : Includes<B, Head<A>> extends false ? 2 : 1];
