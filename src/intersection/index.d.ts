import { Tail, Head, Unshift, Includes, Reverse } from '..';

export type Intersection<
  A extends Array<any>,
  B extends Array<any>,
  R extends Array<any> = []
> = {
  0: Reverse<R>;
  1: Intersection<Tail<A>, B, Unshift<R, Head<A>>>;
  2: Intersection<Tail<A>, B, R>;
}[A extends [] ? 0 : Includes<B, Head<A>> extends false ? 2 : 1];
