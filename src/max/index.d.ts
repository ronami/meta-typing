import { Head, Gte, Tail } from '..';

// Computes the maximum value of array: https://lodash.com/docs/4.17.15#max.
export type Max<
  // The array to iterate over.
  T extends Array<number>,
  // An internal variable to track the currently maximum value. In the first
  // call this is initialized to the first element of the array.
  R extends number = Head<T>
> = {
  // Check if the input array is empty and return `never` if it is:
  0: never;
  // Otherwise, check if the input array has only one element. If that's
  // the case, return `R` since it's already that element:
  1: R;
  // Then, check if the
  2: Max<Tail<T>, R>;
  //
  3: Max<Tail<T>>;
}[T extends []
  ? 0
  : T extends [number]
  ? 1
  : Gte<R, Head<Tail<T>>> extends true
  ? 2
  : 3];
