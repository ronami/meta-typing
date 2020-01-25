import { Head, Gte, Tail } from '..';

// Computes the maximum value of an array: https://lodash.com/docs/4.17.15#max.
//
//   type S = Max<[1, 2, 3]>; // 3
//
export type Max<
  // The array to iterate over.
  T extends Array<number>
> =
  // Check if the array is empty, otherwise run the helper function `Maximum` with the first as
  // the current highest element and the rest of the array.
  T extends [] ? never : Maximum<Tail<T>, Head<T>>;

// Notice that the function is implemented with an object and a ternary check that accesses
// one of its properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is the same as writing: `T extends H ? A : B`. If the condition is true then
// `A` is returned because it's referenced by the `0` key. Otherwise it's `B` that's returned
// since it's referenced by the `1` key.
//
// TypScript's type system doesn't support recursive types and the above example is a way
// of going around it. Please note that it's not something TypeScript officially supports:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
type Maximum<
  // The array to iterate over.
  T extends Array<number>,
  // An internal variable to track the current maximum value.
  R extends number,
  // A convenience variable to track the first element of the array.
  C extends number = Head<T>
> = {
  // Start by checking if we iterated over the entire array. If that's the case, return the maximum
  // value we found.
  finish: R;
  // Next, check if the next element of the array is greater than the current maximum element (R).
  // If it is, replace it with the first element of the array.
  replace: Maximum<Tail<T>, C>;
  // Otherwise, skip it, keep `R` as the maximum element and run the recursion again.
  next: Maximum<Tail<T>, R>;
}[T extends [] ? 'finish' : Gte<C, R> extends true ? 'replace' : 'next'];
