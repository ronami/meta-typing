import { Head, Tail, Includes, Unshift, Reverse } from '..';

// Removes all given values from an array: https://lodash.com/docs/4.17.15#nth.
export type Pull<
  // The input array.
  T extends Array<any>,
  // The values to remove.
  D extends Array<any>,
  // An internal array to accumulate the result.
  R extends Array<any> = []
> = {
  // If the input array is empty then we reached the end of our recursion and we just
  // return the accumulated result. We `Reverse` the it before returning since we keep
  // unshifting elements into it.
  0: Reverse<R>;
  // Then, check if the next value in the input array is in the array of values to remove.
  // If it is then we should exclude it from our accumulator and we just run the recursion
  // again on the rest of the input array (skipping this value and not adding it to the
  // accumulator):
  1: Pull<Tail<T>, D, R>;
  // Finally, if it's not in the array of values to remove, we add the next value of `T`
  // into the accumulator and run the recursion again on the rest of the input array:
  2: Pull<Tail<T>, D, Unshift<R, Head<T>>>;
}[T extends [] ? 0 : Includes<D, Head<T>> extends true ? 1 : 2];
