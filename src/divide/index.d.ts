import { Substract, Dec, Inc, Cast, IsNever } from '..';

// Divide two numbers: https://lodash.com/docs/4.17.15#divide.
//
//   type S = Divide<6, 2>; // 3
//
// Note: this version is only going to work for computation that result with whole numbers
//
// Also notice that the function is implemented with an object and a ternary check that accesses
// one of it's properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is essentially the same as writting: `T extends H ? A : B`. If this type is using
// recursion, using the latter approach quickly results with type errors of infinite recursion
// so the first option is used to avoid false compiler errors.
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
  1: Dec<R>;
  //
  2: never;
  //
  3: Substract<A, B> extends infer G
    ? Divide<Cast<G, number>, B, Inc<R>>
    : never;
}[IsNever<A> extends true ? 1 : A extends 0 ? 0 : B extends 0 ? 2 : 3];

type S = Divide<3, 2>;
