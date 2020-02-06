import { Inc, Unshift, Reverse, Gte } from '..';

// Creates an array of numbers progressing from start up to, but not including, end:
// https://lodash.com/docs/4.17.15#range.
//
//   type S = Range<1, 5>; // [1, 2, 3, 4]
//
// This type uses recursive type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Range<
  // The start of the range.
  S extends number,
  // The end of the range.
  E extends number,
  // An accumulator to collect the result.
  R extends Array<number> = []
> = {
  // Start by checking if we reached the end of the recursion by checking if the start
  // range is less than the end range. If it is, we return the accumulator as the result:
  finish: Reverse<R>;
  // Otherwise, we push the current value of `S` (the start of the range) into the accumulator
  // and run the recursion again by decreasing `S`'s value by 1:
  next: Range<Inc<S>, E, Unshift<R, S>>;
  // For example, running Range<1, 3> will first translate into Range<2, 3, [1]>. Notice
  // that S was increased by 1, and its value was inserted into the empty accumulator
  // (the third argument).
  //
  // Next, the recursion will run again with: Range<3, 3, [2, 1]>. Since 2 is less than 3,
  // the recrsion ran again by increasing `S`'s value by 1 again and inserting its value
  // to the beginning of the accumulator array.
  //
  // Finally, since the start and end values are the same, the recursion will return the
  // reversed value of the accumulator, which yields to [1, 2].
}[Gte<S, E> extends true ? 'finish' : 'next'];
