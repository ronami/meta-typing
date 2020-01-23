import { Head, Tail, Includes, Unshift, Reverse } from '..';

// Removes all given values from an array: https://lodash.com/docs/4.17.15#nth.
//
//   type S = Pull<[1, 2, 3], [2]>; // [1, 3]
//
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
export type Pull<
  // The input array.
  T extends Array<any>,
  // The values to remove.
  D extends Array<any>,
  // An internal array to accumulate the result.
  R extends Array<any> = []
> = {
  // If the input array is empty then we reached the end of our recursion and we just
  // return the accumulated result. We `Reverse` the it before returning since we keep
  // unshifting elements into it.
  finish: Reverse<R>;
  // Then, check if the next value in the input array is in the array of values to remove.
  // If it is then we should exclude it from our accumulator and we just run the recursion
  // again on the rest of the input array (skipping this value and not adding it to the
  // accumulator):
  skip: Pull<Tail<T>, D, R>;
  // Finally, if it's not in the array of values to remove, we add the next value of `T`
  // into the accumulator and run the recursion again on the rest of the input array:
  insert: Pull<Tail<T>, D, Unshift<R, Head<T>>>;
  // For example, Pull<[1, 2, 3], [2]> will first translate into: Pull<[2, 3], [2], [1]>.
  // Notice that the first element of the array was inserted into the accumulator (3rd
  // argument) because it's not present in the array of values to removes ([2]).
  //
  // Next, the recursion will be called again: Pull<[3], [2], [1]>. Since the next value
  // of the array (2) is in the array of values to remove, we don't insert it inot the
  // accumulator, and the recursion runs on the rest of the array.
  //
  // Then, the recursion runs again with Pull<[], [2], [3, 1]> since 3 isn't in the array
  // of values to remove.
  //
  // And finally, since the array is now empty, pull returns the reversed accumulated value
  // which is [1, 3].
}[T extends []
  ? 'finish'
  : Includes<D, Head<T>> extends true
  ? 'skip'
  : 'insert'];
