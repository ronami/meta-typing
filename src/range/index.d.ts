import { Dec, Unshift } from '..';

// Creates an array of numbers (positive and/or negative) progressing from start
// up to, but not including, end: https://lodash.com/docs/4.17.15#range.
//
//   type S = Pull<[1, 2, 3], [2]>; // [1, 3]
//
export type Range<
  //
  T extends number,
  //
  R extends Array<number> = []
> = {
  //
  0: R;
  //
  1: Range<Dec<T>, Unshift<R, T>>;
}[T extends 0 ? 0 : 1];
