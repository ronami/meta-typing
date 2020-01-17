import { Add, Dec, Cast } from '..';

// Multiply two numbers: https://lodash.com/docs/4.17.15#multiply.
//
//   type S = Multiply<2, 3>; // 6
//
// Notice that the function is implemented with an object and a ternary check that accesses
// one of its properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is essentially the same as writing: `T extends H ? A : B`. If this type is using
// recursion, using the latter approach quickly results with type errors of infinite recursion
// so the first option is used to avoid false compiler errors.
export type Multiply<
  // The first number in a multiplication.
  A extends number,
  // The second number in a multiplication.
  B extends number
> = {
  // If any of the numbers is 0, return 0:
  0: 0;
  // Next, check if any of them are equal to 1 and return the other number:
  1: A;
  2: B;
  // If they're both not 1s or 0s, we call the recursion again, like this:
  //
  //   Add<A, Multiply<A, Dec<B>>>
  //
  // We add the value of the first number (A) to the result of calling Multiply
  // again in which we decrease B's value by 1. This means that we call Add<A, A>
  // B times.
  //
  // We split the computation into two steps, with a condition that will always be true.
  // This is done to trick the compiler and avoid errors of "Type instantiation is excessively
  // deep..." from the compiler (See more: https://github.com/microsoft/TypeScript/issues/34933).
  //
  // Notice that after we assign the first computation of:
  //
  //   Multiply<A, Dec<B>>
  //
  // to the value of G, we also pass it to a call to Cast. Normally we don't have to do that
  // but the compiler doesn't know that G is a number.
  // By casting it we tell the compiler that it is always going to get a number: Either the value
  // we pass is of type `number`, or that it's going to use the general `number` type.
  3: Multiply<A, Dec<B>> extends infer G ? Add<A, Cast<G, number>> : never;
}[A extends 0 ? 0 : B extends 0 ? 0 : B extends 1 ? 1 : A extends 1 ? 2 : 3];
