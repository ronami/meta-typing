import { Inc, Unshift, Reverse } from '..';

// Creates an array of numbers (positive and/or negative) progressing from start
// up to, but not including, end: https://lodash.com/docs/4.17.15#range.
//
//   type S = Range<1, 5>; // [1, 2, 3, 4]
//
export type Range<
  // The start of the range.
  S extends number,
  // The end of the range.
  E extends number,
  //
  R extends Array<number> = []
> = {
  //
  0: Reverse<R>;
  //
  1: Range<Inc<S>, E, Unshift<R, S>>;
}[S extends E ? 0 : 1];
