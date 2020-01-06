import { Substract, Inc, Cast } from '..';

export type Divide<A extends number, B extends number, R extends number = 0> = {
  0: R;
  1: never;
  2: Substract<A, B> extends infer G
    ? Divide<Cast<G, number>, B, Inc<R>>
    : never;
}[A extends 0 ? 0 : B extends 0 ? 1 : 2];
