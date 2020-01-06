import { Tail, Head, Unshift, Reverse } from '..';

// Creates an array with all falsey values removed. The values false, null, 0,
// "", and undefined are falsey: https://lodash.com/docs/4.17.15#compact.
export type Compact<
  // The input array.
  T extends Array<any>,
  // An internal array that accumulates the results. Once the recursion ends, it
  // be returned.
  R extends Array<any> = []
> =
  // If the input array is empty, return `R`. We `Reverse` the it before returning
  // it since we keep unshifting elements into it.
  T extends []
    ? Reverse<R>
    : {
        // If `T` is a falsey value, run the recursion again with the rest of the
        // array:
        0: Compact<Tail<T>, R>;
        // Otherwise, insert the new element to the accumulator array `R` and run
        // the recursion again with the rest of the array:
        1: Compact<Tail<T>, Unshift<R, Head<T>>>;
      }[Head<T> extends 0
        ? 0
        : Head<T> extends null
        ? 0
        : Head<T> extends undefined
        ? 0
        : Head<T> extends false
        ? 0
        : Head<T> extends ''
        ? 0
        : 1];
