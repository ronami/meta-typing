import { Tail, Unshift, Dec, Reverse, Head } from '..';

// Creates a slice of an array with n elements taken from the beginning:
// https://lodash.com/docs/4.17.15#take.
//
type S = Take<[1, 2, 3, 4, 5, 6], 3>; // [1, 2, 3]
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Take<
  // The input array.
  A extends Array<any>,
  // The number of elements to take. Defaults to 1.
  N extends number = 1,
  // An internal array to accumulate the taken elements. When the recursion ends,
  // it is returned.
  R extends Array<any> = []
> = {
  // If the input array is empty end the recursion and return the internal
  // accumulator. We reverse it first since we add elements into it in a reversed
  // order:
  finish: Reverse<R>;
  // Otherwise, run the recursion again with the reset of the array, decrease
  // the value of `N` by 1, and push the first element into the accumulator:
  next: Take<Tail<A>, Dec<N>, Unshift<R, Head<A>>>;
  // For example, evaluating Take<[1, 2, 3, 4, 5, 6], 2> will first translate into:
  // Take<[2, 3, 4, 5, 6], 1, [1]>. You can see that since the array wasn't empty and
  // `N` wasn't 0, the recursion ran again on the rest of the array, inserted the first
  // element into the accumulator and decreased the value of `N` by 1.
  //
  // Then again, since `N` isn't 0 and the array isn't empty, the recursion will run
  // on the rest of the array, insert the fist element into the accumulator and reduce
  // the value of `N` by 1: Take<[3, 4, 5, 6], 0, [2, 1]>.
  //
  // Finally, now that `N` is 0, the recursion terminates and returns the reversed value
  // of the accunulator which results with [1, 2]. Two elements were taken from the
  // beginning of the array.
}[A extends [] ? 'finish' : N extends 0 ? 'finish' : 'next'];
