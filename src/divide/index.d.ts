import { Substract, Inc } from '..';

export type Divide<A extends number, B extends number, R extends number = 0> = {
  0: R;
  1: never;
  // @ts-ignore
  2: Divide<Substract<A, B>, B, Inc<R>>;
}[A extends 0 ? 0 : B extends 0 ? 1 : 2];
