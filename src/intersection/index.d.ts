import { Tail, Head, Unshift, InEvery, Reverse } from '..';

// Creates an array of unique values that are included in all given arrays:
// https://lodash.com/docs/4.17.15#intersection.
//
//   type S = Intersection<[[1, 2, 3], [2, 3, 4]]>; // [2, 3]
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
export type Intersection<
  // The arrays to inspect.
  T extends Array<Array<any>>
> = {
  // Check if the input array is empty and return an empty array.
  //
  // If it's not empty, check if its first element is an empty array. If that's the
  // case, also return an empty array.
  0: [];
  // Otherwise, run the `Intersect` with the first array, and all other arrays.
  1: Intersect<Head<T>, Tail<T>>;
}[T extends [] ? 0 : Head<T> extends [] ? 0 : 1];

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
  0: Reverse<R>;
  // If the first element of `T` is included in all of the arrays in `G`, run the
  // recursion again with the rest of `T`, and insert that element into the accumulator
  // array.
  1: Intersect<Tail<T>, G, Unshift<R, Head<T>>>;
  // Otherwise, if the first element of `T` is not included in all of the arrays in `G`
  // skip it by running the recursion again on the rest of `T`, without changing the
  // accumulator at all.
  2: Intersect<Tail<T>, G, R>;
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
}[T extends [] ? 0 : InEvery<G, Head<T>> extends true ? 1 : 2];
