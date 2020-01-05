import { Dec } from '..';

// Substracts two numbers: https://lodash.com/docs/4.17.15#subtract.
//
// Because TypeScript's type system has no support for arithmetic, the implementation
// uses recursion.
export type Substract<
  // Accept two numbers two substract from one another.
  A extends number,
  B extends number
> = {
  // If `B` is 0 then we're done, just return `A`
  0: A;
  // Otherwise, call `Substract` recursively while decreasing `A` by 1 and also decreasing
  // `B` by one. Eventually `B` will be 0 and the recursion will terminate.
  //
  // For example: Substract<3, 2> will first translate into another Substract call that will
  // decrease both `A`'s and `B`'s value by 1: Substract<2, 1>. Since `B` isn't 0, we run
  // again: Substract<1, 0>. Now that `B` is 0, the recursion terminates and returns the
  // value of `A` which is 1.
  1: Substract<Dec<A>, Dec<B>>;
}[B extends 0 ? 0 : 1];
