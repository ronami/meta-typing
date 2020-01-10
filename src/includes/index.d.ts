import { Tail, Head, IsEqual } from '..';

// Checks if a value is an array: https://lodash.com/docs/4.17.15#includes.
//
//   type S = Includes<[1, 2, 3], 2>; // true
//
export type Includes<T extends Array<any>, E> =
  // We start by checking if the `T` array is empty. If it is, we reached the end of the
  // recursion without finding any matching elements and return `false`:
  T extends []
    ? false
    : {
        // If it's not empty, we use the Head function to get the first element of the array
        // and use IsEqual to check if it equals to the value of `E`.
        //
        // If it is, stop the recursion and return true:
        0: true;
        // Otherwise, keep the recursion going by passing the rest of the array (everything
        // but the first element which we just checked):
        1: Includes<Tail<T>, E>;
      }[IsEqual<Head<T>, E> extends true ? 0 : 1];
