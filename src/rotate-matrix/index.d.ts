// You are given an N×N 2D matrix (representing an image). Rotate the matrix by 90 degrees
// (clockwise and counter-clockwise):
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/square-matrix-rotation.

import { Zip, Reverse, Cast, Unshift, Tail, Head } from '..';

//
export type RotateCCW<
  //
  T extends Array<Array<any>>
> =
  //
  Zip<T> extends infer G ? Reverse<Cast<G, Array<any>>> : never;

//
export type RotateCW<
  //
  T extends Array<Array<any>>,
  //
  R extends Array<Array<any>> = [],
  //
  C extends Array<any> = Tail<T>
> =
  //
  Zip<T> extends infer G ? ReverseArray<Cast<G, Array<any>>> : never;

//
type ReverseArray<
  //
  T extends Array<Array<any>>,
  //
  R extends Array<Array<any>> = []
> = {
  //
  0: Reverse<R>;
  //
  1: Unshift<R, Reverse<Head<T>>> extends infer G
    ? ReverseArray<Tail<T>, Cast<G, Array<any>>>
    : never;
}[T extends [] ? 0 : 1];
