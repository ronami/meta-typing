import { Tail, Unshift, Dec, Reverse, Head } from '..';

// Creates a slice of array with n elements taken from the beginning:
// https://lodash.com/docs/4.17.15#take.
//
//   type S = Take<[1, 2, 3, 4, 5, 6], 3>; // [1, 2, 3]
//
export type Take<
  // The input array.
  A extends Array<any>,
  // The number of elements to take. Defaults to 1.
  N extends number = 1,
  // An internal array to accumulate the taken elements. When the recursion ends,
  // it is returned.
  R extends Array<any> = []
> = {
  // If the input array is empty end the recursion and return the internal
  // accumulator. We reverse it first since we add elements into it in a reversed
  // order:
  0: Reverse<R>;
  // Otherwise, run the recursion again with the reset of the array, decrease
  // the value of `N` by 1, and push the first element into the accumulator:
  1: Take<Tail<A>, Dec<N>, Unshift<R, Head<A>>>;
}[A extends [] ? 0 : N extends 0 ? 0 : 1];
