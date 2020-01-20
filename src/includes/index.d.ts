import { Tail, Head, IsEqual } from '..';

// Checks if a value is an array: https://lodash.com/docs/4.17.15#includes.
//
//   type S = Includes<[1, 2, 3], 2>; // true
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
        // For example, Includes<[1, 2, 3], 2> will translate into: Includes<[2, 3], 2>, since
        // the first element (1) doesn't equal the element we want to find (2). So the recursion
        // runs on the rest of the array.
        //
        // Then, Includes<[2, 3], 2> runs, and now the first element (2) is the same as the element
        // we want to find, the recursion terminates and returns true.
      }[IsEqual<Head<T>, E> extends true ? 0 : 1];
