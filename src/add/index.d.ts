import { Acc, Dec } from '..';

export type Add<A extends number, B extends number> = {
  0: A;
  1: Add<Acc<A>, Dec<B>>;
}[B extends 0 ? 0 : 1];
