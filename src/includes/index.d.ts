import { Tail, Head, IsEqual } from '..';

// Checks if a value is an array: https://lodash.com/docs/4.17.15#includes.
//
type S = Includes<[1, 2, 3], 2>; // true
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Includes<T extends Array<any>, E> = {
  // Start by checking if the `T` array is empty. If it is, we reached the end of the
  // recursion without finding any matching elements and return `false`:
  'not-found': false;
  // If it's not empty, we use the Head function to get the first element of the array
  // and use IsEqual to check if it equals to the value of `E`.
  //
  // If it is, stop the recursion and return true:
  found: true;
  // Otherwise, keep the recursion going by passing the rest of the array (everything
  // but the first element which we just checked):
  next: Includes<Tail<T>, E>;
  // For example, Includes<[1, 2, 3], 2> will translate into: Includes<[2, 3], 2>, since
  // the first element (1) doesn't equal the element we want to find (2). So the recursion
  // runs on the rest of the array.
  //
  // Then, Includes<[2, 3], 2> runs, and now the first element (2) is the same as the element
  // we want to find, the recursion terminates and returns true.
}[T extends []
  ? 'not-found'
  : IsEqual<Head<T>, E> extends true
  ? 'found'
  : 'next'];
