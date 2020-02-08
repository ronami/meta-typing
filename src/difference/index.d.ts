import { Tail, Head, Unshift, InEvery, Reverse } from '..';

// Creates an array of values from the first array that are not included in the other given arrays:
// https://lodash.com/docs/4.17.15#difference.
//
//   type S = Difference<[[1, 2, 3], [2, 3, 4]]>; // [1]
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Difference<
  // The arrays to inspect.
  T extends Array<Array<any>>
> = {
  // Check if the input array is empty and return an empty array.
  //
  // If it's not empty, check if its first element is an empty array. If that's the
  // case, also return an empty array.
  finish: [];
  // Otherwise, run the `Diff` with the first array, and all other arrays.
  next: Diff<Head<T>, Tail<T>>;
}[T extends [] ? 'finish' : Head<T> extends [] ? 'finish' : 'next'];

// A helper function that takes the first array (`T`) and all other arrays (`G`).
// It iterates over `T` and inserts every value of `T` into `R`, as long as it's
// not included any of the arrays of `G`.
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
  finish: Reverse<R>;
  // If the first element of `T` isn't included in any of the arrays in `G`, run the
  // recursion again with the rest of `T`, and insert that element into the accumulator
  // array.
  insert: Diff<Tail<T>, G, Unshift<R, Head<T>>>;
  // Otherwise, if the first element of `T` is included in any of the arrays in `G`,
  // skip it by running the recursion again on the rest of `T`, without changing the
  // accumulator at all.
  skip: Diff<Tail<T>, G, R>;
  // For example, calling Difference<[[1, 2, 3], [2, 3, 4]]> will first translate into:
  // Diff<[1, 2, 3], [[2, 3, 4]], []>. Notice that `Diff` was called with the first array
  // and all other arrays as its 2nd argument, along with an empty accumulator.
  //
  // Next, since `T` isn't empty, we check if the first element of `T` (1) is included
  // in any of the arrays in `G`. Since it's not included, we run the recursion again
  // on the rest of the input array, and insert the first element into the accumulator:
  // Diff<[2, 3], [[2, 3, 4]], [1]>.
  //
  // Then, the next element of `T` is checked against the other arrays, and because it
  // exists in one, it's not added to the accumulator: Diff<[3], [[2, 3, 4]], [1]>.
  //
  // Then again, the next element (3) is checked against the arrays in `G`. It is included
  // in one of them, so it's skipped and not inserted into the accumulator:
  // Diff<[], [[2, 3, 4]], [1]>.
  //
  // Finally, since the input array is empty, the reversed accumulator is returned which
  // results with: [1].
}[T extends []
  ? 'finish'
  : InEvery<G, Head<T>> extends false
  ? 'insert'
  : 'skip'];
