import { Tail, Unshift, Dec, Reverse, Head } from '..';

export type Take<
  A extends Array<any>,
  N extends number = 1,
  R extends Array<any> = []
> = {
  0: Reverse<R>;
  1: Take<Tail<A>, Dec<N>, Unshift<R, Head<A>>>;
}[A extends [] ? 0 : N extends 0 ? 0 : 1];
