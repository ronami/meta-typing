import { Head, Lte, Tail } from '..';

// Computes the minimum value of an array: https://lodash.com/docs/4.17.15#min.
//
//   type S = Min<[1, 2, 3]>; // 1
//
export type Min<
  // The array to iterate over.
  T extends Array<number>
> =
  // Check if the array is empty, otherwise run the helper function `Minimum` with the first as
  // the current lowest element and the rest of the array.
  T extends [] ? never : Minimum<Tail<T>, Head<T>>;

// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
type Minimum<
  // The array to iterate over.
  T extends Array<number>,
  // An internal variable to track the current minimum value.
  R extends number,
  // A convenience variable to track the first element of the array.
  C extends number = Head<T>
> = {
  // Start by checking if we iterated over the entire array. If that's the case, return the minimum
  // value we found.
  finish: R;
  // Next, check if the next element of the array is less than the current minimum element (R).
  // If it is, replace it with the first element of the array.
  replace: Minimum<Tail<T>, C>;
  // Otherwise, skip it, keep `R` as the minimum element and run the recursion again.
  next: Minimum<Tail<T>, R>;
}[T extends [] ? 'finish' : Lte<C, R> extends true ? 'replace' : 'next'];
