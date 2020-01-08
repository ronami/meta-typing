import { Tail, Head, Unshift, Reverse, Dec } from '..';

// Creates a slice of array from start up to, but not including, end:
// https://lodash.com/docs/4.17.15#slice.
export type Slice<
  // The array to slice.
  T extends Array<any>,
  // The start position.
  S extends number,
  // The end position.
  E extends number,
  // An internal array to accumulate the result.
  R extends Array<any> = []
> = {
  // We start by checking if the input array is empty. If it is, we reached the end
  // of the recursion and we return the results we accumulated so far.
  // We reverse it first since we keep inserting elements to it from the beggining (using
  // Unshift):
  0: Reverse<R>;
  // Next up, we check if the start number is 0. If it's not, we run the recursion again
  // on the rest of the array and decrease its value by 1 and wait until it gets to 1:
  2: Slice<Tail<T>, Dec<S>, E>;
  // If the start position is 0, we check if the end position is 0 too. If it is, then we've
  // finished with the recursion and return the reversed accumulated result (R). Otherwise,
  // we run the recursion again on the rest of the array, with the same start position (0),
  // decrease the end position by 1, and also push the current element into our accumulator:
  1: Slice<Tail<T>, S, Dec<E>, Unshift<R, Head<T>>>;
}[T extends [] ? 0 : S extends 0 ? (E extends 0 ? 0 : 1) : 2];
