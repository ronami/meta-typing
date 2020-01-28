// You are given an N×N 2D matrix (representing an image). Rotate the matrix by 90 degrees
// (clockwise and counter-clockwise):
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/square-matrix-rotation.

import { Zip, Reverse, Cast, Unshift, Tail, Head } from '..';

// Rotates a matrix counter clock-wise.
export type RotateCCW<
  // The input matrix. The matrix is an array of arrays and represents an image.
  T extends Array<Array<any>>
> =
  //
  Zip<T> extends infer G ? Reverse<Cast<G, Array<any>>> : never;

// Rotates a matrix clock-wise.
export type RotateCW<
  // The input matrix. The matrix is an array of arrays and represents an image.
  T extends Array<Array<any>>
> =
  //
  Zip<T> extends infer G ? ReverseArray<Cast<G, Array<any>>> : never;

// Helper function that takes an array of arrays and reverses each of the inner arrays.
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
type ReverseArray<
  // The input array.
  T extends Array<Array<any>>,
  // An accumulator to collect the results.
  R extends Array<Array<any>> = []
> = {
  // If the input array is empty, return the accumulator array. We reverse it first
  // since we add elements into it in a reversed order.
  finish: Reverse<R>;
  //
  next: Unshift<R, Reverse<Head<T>>> extends infer G
    ? ReverseArray<Tail<T>, Cast<G, Array<any>>>
    : never;
}[T extends [] ? 'finish' : 'next'];
