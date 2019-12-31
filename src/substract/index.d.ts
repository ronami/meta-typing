import { Dec } from '..';

export type Substract<A extends number, B extends number> = {
  0: A;
  1: Substract<Dec<A>, Dec<B>>;
}[B extends 0 ? 0 : 1];
