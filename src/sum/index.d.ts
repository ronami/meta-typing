import { Add, Tail, Head, Cast } from '..';

// Computes the sum of the values in array: https://lodash.com/docs/4.17.15#sum.
//
//   type S = Sum<[1, 2, 3]>; // 6
//
// Notice that the function is implemented with an object and a ternary check that accesses
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
export type Sum<
  // The array to iterate over.
  A extends Array<number>,
  // A value to accumulate the results, starts at 0.
  R extends number = 0
> = {
  // Start by checking if the array is empty. If it is then we reached the end of the
  // recursion and we return the accumulated result:
  0: R;
  // Otherwise, we run the recursion again with the rest of the array, and add the first
  // element of the array to our accumulated result (R):
  1: Add<R, Head<A>> extends infer G ? Sum<Tail<A>, Cast<G, number>> : never;
  // This may look confusing but instead of computing:
  //
  //   Sum<Tail<A>, Add<R, Head<A>>>
  //
  // We split the computation into two steps, with a condition that will always be true.
  // This is done to trick the compiler and avoid errors of "Type instantiation is excessively
  // deep..." from the compiler (See more: https://github.com/microsoft/TypeScript/issues/34933).
  //
  // Notice that after we assign the first computation of:
  //
  //   Add<R, Head<A>>
  //
  // to the value of G, we also pass it to a call to Cast. Normally we don't have to do that
  // but the compiler doesn't know that G is a number.
  // By casting it we tell the compiler that it is always going to get a number: Either the value
  // we pass is of type `number`, or that it's going to use the general `number` type.
}[A extends [] ? 0 : 1];
