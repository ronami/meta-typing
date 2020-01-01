import { Tail, Unshift, Head, Reverse } from '..';

export type Initial<A extends Array<any>, R extends Array<any> = []> = {
  0: Reverse<R>;
  1: Initial<Tail<A>, Unshift<R, Head<A>>>;
}[A extends [] ? 0 : A extends [any] ? 0 : 1];
