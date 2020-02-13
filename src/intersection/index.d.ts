import { Tail, Head, Unshift, InEvery, Reverse } from '..';

// Creates an array of unique values that are included in all given arrays:
// https://lodash.com/docs/4.17.15#intersection.
//
type S = Intersection<[[1, 2, 3], [2, 3, 4]]>; // [2, 3]
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Intersection<
  // The arrays to inspect.
  T extends Array<Array<any>>
> = {
  // Check if the input array is empty and return an empty array.
  //
  // If it's not empty, check if its first element is an empty array. If that's the
  // case, also return an empty array.
  finish: [];
  // Otherwise, run the `Intersect` with the first array, and all other arrays.
  next: Intersect<Head<T>, Tail<T>>;
}[T extends [] ? 'finish' : Head<T> extends [] ? 'finish' : 'next'];

// A helper function that takes the first array (`T`) and all other arrays (`G`).
// It iterates over `T` and inserts every value of `T` into `R`, as long as it's
// included any of the arrays of `G`.
type Intersect<
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
  // If the first element of `T` is included in all of the arrays in `G`, run the
  // recursion again with the rest of `T`, and insert that element into the accumulator
  // array.
  insert: Intersect<Tail<T>, G, Unshift<R, Head<T>>>;
  // Otherwise, if the first element of `T` is not included in all of the arrays in `G`
  // skip it by running the recursion again on the rest of `T`, without changing the
  // accumulator at all.
  skip: Intersect<Tail<T>, G, R>;
  // For example, calling Intersection<[[1, 2, 3], [2, 3, 4]]> will first translate into:
  // Intersect<[1, 2, 3], [[2, 3, 4]], []>. Notice that `Intersect` was called with the
  // first array and all other arrays as its 2nd argument, along with an empty accumulator.
  //
  // Next, since `T` isn't empty, we check if the first element of `T` (1) is included
  // in any of the arrays in `G`. Since it's not included, we run the recursion again
  // on the rest of the input array, and skip inserting it into the accumulator:
  // Intersect<[2, 3], [[2, 3, 4]], []>.
  //
  // Then, the next element of `T` is checked against the other arrays, and because it
  // exists in all of them, it's inserted to the accumulator:
  // Intersect<[3], [[2, 3, 4]], [2]>.
  //
  // Then again, the next element (3) is checked against the arrays in `G`. It is included
  // in all of them, so it's inserted into the accumulator: Intersect<[], [[2, 3, 4]], [3, 2]>.
  //
  // Finally, since the input array is empty, the reversed accumulator is return which
  // results with: [2, 3].
}[T extends []
  ? 'finish'
  : InEvery<G, Head<T>> extends true
  ? 'insert'
  : 'skip'];
