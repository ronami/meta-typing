import { Substract, Inc, Cast } from '..';

// Divide two numbers: https://lodash.com/docs/4.17.15#divide.
//
//   type S = Divide<6, 2>; // 3
//
// Note: this version is only going to work for computation that result with whole numbers
export type Divide<
  // The first number in a division.
  A extends number,
  // The second number in a division.
  B extends number,
  //
  R extends number = 0
> = {
  //
  0: R;
  //
  1: never;
  //
  2: Substract<A, B> extends infer G
    ? Divide<Cast<G, number>, B, Inc<R>>
    : never;
}[A extends 0 ? 0 : B extends 0 ? 1 : 2];
