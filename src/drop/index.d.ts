import { Dec, Tail } from '..';

// Creates a slice of an array with n elements dropped from the beginning:
// https://lodash.com/docs/4.17.15#drop.
//
//   type S = Drop<[1, 2, 3], 1>; // [2, 3]
//
// This type uses recursive type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Drop<
  // The input array.
  A extends Array<any>,
  // The number of elements to drop from the beginning.
  N extends number
> = {
  // If the input array `A` is empty, we either reached the end of our recursion
  // or that the initial input was empty. Either way, return an empty array:
  empty: [];
  // Check if `N` is 0, which means that no more elements need to be dropped, and
  // return the input array:
  finish: A;
  // Otherwise, run again by dropping the first element and decrementing `N` by 1:
  next: Drop<Tail<A>, Dec<N>>;
  // For example, evaluating Drop<[1, 2, 3], 1> will first translate into:
  // Drop<[2, 3], 0>. Since `N` wasn't 0, the recursion ran again on the reset of
  // the array and decreased the number of `N` by 1.
  //
  // Then, since the value of `N` is 0, the remaining value of the array is returned
  // which results in [2, 3].
}[A extends [] ? 'empty' : N extends 0 ? 'finish' : 'next'];
