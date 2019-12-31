import { Tail, Head, Includes, Unshift, Reverse } from '..';

export type Difference<
  A extends Array<any>,
  B extends Array<any>,
  R extends Array<any> = []
> = {
  0: Reverse<R>;
  1: Difference<Tail<A>, B, Unshift<R, Head<A>>>;
  2: Difference<Tail<A>, B, R>;
}[A extends [] ? 0 : Includes<B, Head<A>> extends false ? 1 : 2];
