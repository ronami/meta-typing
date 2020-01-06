import { Gte, Lte } from '..';

// Checks if `N` is between start and up to, but not including, end:
// https://lodash.com/docs/4.17.15#inRange.
export type InRange<
  // The number to check.
  N extends number,
  // The start of the range.
  S extends number,
  // The end of the range.
  E extends number
> =
  // If `N` if greather than or equal to the start of the range and it's smaller
  // than or equal to the end of the range, return true.
  //
  // Otherwise, it's false:
  Gte<N, S> extends true ? (Lte<N, E> extends true ? true : false) : false;
