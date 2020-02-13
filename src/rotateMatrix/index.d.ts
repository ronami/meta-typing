// You are given an N×N 2D matrix (representing an image). Rotate the matrix by 90 degrees
// (clockwise and counter-clockwise):
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/square-matrix-rotation.

import { Zip, Reverse, Cast, Unshift, Tail, Head } from '..';

// Rotates a matrix counter clock-wise.
//
type S1 = RotateCCW<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>; // [[3, 6, 9], [2, 5, 8], [1, 4, 7]]
//
export type RotateCCW<
  // The input matrix. The matrix is an array of arrays and represents an image.
  T extends Array<Array<any>>
> =
  //
  Zip<T> extends infer G ? Reverse<Cast<G, Array<any>>> : never;

// Rotates a matrix clock-wise.
//
type S2 = RotateCW<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>; // [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
//
export type RotateCW<
  // The input matrix. The matrix is an array of arrays and represents an image.
  T extends Array<Array<any>>
> =
  //
  Zip<T> extends infer G ? ReverseArray<Cast<G, Array<any>>> : never;

// Helper function that takes an array of arrays and reverses each of the inner arrays.
//
type S3 = ReverseArray<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>; // [[3, 2, 1], [6, 5, 4], [9, 8, 7]]
//
// This type uses recursive (and not officially supported) type alias, see more:
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
  // Otherwise, reverse the first element of the input array and insert it into the beginning of the
  // accumulator (R). Then, run the recursion again with the new R and the rest of the array.
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Unshift<R, Reverse<Head<T>>> extends infer G
    ? ReverseArray<Tail<T>, Cast<G, Array<any>>>
    : never;
}[T extends [] ? 'finish' : 'next'];
