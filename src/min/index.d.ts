import { Head, Lte, Tail } from '..';

// Computes the minimum value of array: https://lodash.com/docs/4.17.15#min.
//
//   type S = Min<[1, 2, 3]>; // 1
//
export type Min<
  // The array to iterate over.
  T extends Array<number>,
  // An internal variable to track the currently minimum value. In the first
  // call this is initialized to the first element of the array.
  R extends number = Head<T>
> = {
  // Check if the input array is empty and return `never` if it is:
  0: never;
  // Otherwise, check if the input array has only one element. If that's
  // the case, return `R` since it's already that element:
  1: R;
  // Then, check if the
  2: Min<Tail<T>, R>;
  //
  3: Min<Tail<T>>;
}[T extends []
  ? 0
  : T extends [number]
  ? 1
  : Lte<R, Head<Tail<T>>> extends true
  ? 2
  : 3];
