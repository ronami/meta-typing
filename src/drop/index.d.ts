import { Dec, Tail } from '..';

export type Drop<A extends Array<any>, N extends number> = {
  0: [];
  1: A;
  2: Drop<Tail<A>, Dec<N>>;
}[A extends [] ? 0 : N extends 0 ? 1 : 2];
