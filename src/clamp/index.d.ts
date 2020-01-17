import { Gte, Lte } from '..';

// Clamps number within the inclusive lower and upper bounds:
// https://lodash.com/docs/4.17.15#clamp.
//
//   type S = Clamp<8, 0, 5>; // 5
//
export type Clamp<A extends number, L extends number, U extends number> =
  // If `A` is greater than the upper limit, return the upper limit. Otherwise,
  // if `A` is less than the lower limit, return the lower limit.
  //
  // If both are `false` then `A` is within our limits and we return it:
  Gte<A, U> extends true ? U : Lte<A, L> extends true ? L : A;
