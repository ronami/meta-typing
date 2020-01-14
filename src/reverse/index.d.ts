import { Head, Tail, Unshift } from '..';

// Reverses array so that the first element becomes the last, the second element
// becomes the second to last, and so on: https://lodash.com/docs/4.17.15#reverse.
//
//   type S = Reverse<[1, 2, 3]>; // [3, 2, 1]
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
export type Reverse<
  // The array to modify.
  T extends Array<any>,
  // An accumulator to collect the results.
  R extends Array<any> = []
> = {
  // Start by checking if the input array is empty. If it is, return the accumulator
  // as the result:
  0: R;
  // Otherwise, run the recursion again on the rest of the array, and unshift (add to the
  // beginning) the first value into the accumulator array:
  1: Reverse<Tail<T>, Unshift<R, Head<T>>>;
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
}[T extends [] ? 0 : 1];
