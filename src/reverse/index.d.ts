import { Head, Tail, Unshift } from '..';

// Reverses an array so that the first element becomes the last, the second element
// becomes the second to last, and so on: https://lodash.com/docs/4.17.15#reverse.
//
//   type S = Reverse<[1, 2, 3]>; // [3, 2, 1]
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
export type Reverse<
  // The array to modify.
  T extends Array<any>,
  // An accumulator to collect the results.
  R extends Array<any> = []
> = {
  // Start by checking if the input array is empty. If it is, return the accumulator
  // as the result:
  finish: R;
  // Otherwise, run the recursion again on the rest of the array, and unshift (add to the
  // beginning) the first value into the accumulator array:
  next: Reverse<Tail<T>, Unshift<R, Head<T>>>;
  // For example,running Reverse<[1, 2, 3]> will first translate into: Reverse<[2, 3], [1]>.
  // Since the array wasn't empty, the recursion runs again on the array, just without its
  // first element, and that first element was inserted into the accumulator.
  //
  // Next, since the array still isn't empty, the recursion will run again with:
  // Reverse<[3], [2, 1]>. Notice that again, the recursion will run again on the array,
  // just without its first element (which is now 2), and it was inserted to the beginning
  // of the accumulator.
  //
  // Then, we run again since [3] isn't empty yet: Reverse<[], [3, 2, 1]>. The recursion
  // runs again by taking the first value and inserting it to the beginning of R.
  // Finally, now that the array is empty, the accumulator is returned with [3, 2, 1] which
  // is the reversed result of the initial input of [1, 2, 3].
}[T extends [] ? 'finish' : 'next'];
