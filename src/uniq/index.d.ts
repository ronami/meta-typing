import { Tail, Head, Includes, Unshift, Reverse } from '..';

// Creates a duplicate-free version of an array, in which only the first occurrence
// of each element is kept: https://lodash.com/docs/4.17.15#uniq.
//
//   type S = Uniq<[2, 1, 2]>; // [2, 1]
//
export type Uniq<
  // The input array.
  T extends Array<any>,
  // An internal array to accumulate the unique elements. When the recursion ends,
  // it will be returned.
  R extends Array<any> = []
> = {
  // If the input array is empty, return the accumulator array. We reverse it first
  // since we add elements into it in a reversed order.
  0: Reverse<R>;
  // Otherwise, check if the first element of the array is already in the accumulator
  // array. If it is, then there is no need to add it a second time, and we run the
  // recursion again with the rest of the array.
  //
  // If the it isn't in the accumulator array, add it to the beggining of the accumulator
  // array and run the recursion again with the rest of the array:
  1: Includes<R, Head<T>> extends true
    ? Uniq<Tail<T>, R>
    : Uniq<Tail<T>, Unshift<R, Head<T>>>;
}[T extends [] ? 0 : 1];
