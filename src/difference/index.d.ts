import { Tail, Head, Unshift, InEvery, Reverse } from '..';

// Creates an array of array values not included in the other given arrays:
// https://lodash.com/docs/4.17.15#difference.
//
//   type S = Difference<[[1, 2, 3], [2, 3, 4]]>; // [1]
//
export type Difference<
  // The arrays to inspect.
  T extends Array<Array<any>>
> = {
  // Check if the input array is empty and return an empty array.
  //
  // If it's not empty, check if its first element is an empty array. If that's the
  // case, also return an empty array.
  0: [];
  // Otherwise, run the `Diff` with the first array, and all other arrays.
  1: Diff<Head<T>, Tail<T>>;
}[T extends [] ? 0 : Head<T> extends [] ? 0 : 1];

// A helper function that takes the first array (`T`) and all other arrays (`G`).
// It iterates over `T` and inserts every value of `T` into `R`, as long as it's
// not in any of the arrays of `G`.
type Diff<
  // The input array to compare against `G`.
  T extends Array<any>,
  // The arrays to compare against `G`.
  G extends Array<Array<any>>,
  // An accumulator to collect the results.
  R extends Array<any> = []
> = {
  // If the input array is empty, return the accumulator array. We reverse it first
  // since we add elements into it in a reversed order.
  0: Reverse<R>;
  // If the first element of `T` isn't included in any of the arrays in `G`, run the
  // recursion again with the rest of `T`, and insert that element into the accumulator
  // array.
  1: Diff<Tail<T>, G, Unshift<R, Head<T>>>;
  // Otherwise, if the first element of `T` is in any of the arrays in `G`, skip it
  // by running the recursion again on the rest of `T`, without changing the accumulator
  // at all.
  2: Diff<Tail<T>, G, R>;
}[T extends [] ? 0 : InEvery<G, Head<T>> extends false ? 1 : 2];
