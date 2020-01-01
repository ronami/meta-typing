import { Tail, Head } from '..';

export type Last<A extends Array<any>> = {
  0: undefined;
  1: Head<A>;
  2: Last<Tail<A>>;
}[A extends [] ? 0 : A extends [any] ? 1 : 2];
