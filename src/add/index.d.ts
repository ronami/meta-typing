import { Inc, Dec } from '..';

// Adds two numbers: https://lodash.com/docs/4.17.15#add.
//
// Because TypeScript's type system has no support for arithmetic, the implementation
// uses recursion.
export type Add<
  // Accept two numbers two add together.
  A extends number,
  B extends number
> = {
  // If `B` is 0 then we're done, just return `A`
  0: A;
  // Otherwise, call `Add` recursively while increasing `A` by 1 and decreasing
  // `B` by one. Eventually `B` will be 0 and the recursion will terminate.
  //
  // For example: Add<2, 3> will first translate into another Add call that will
  // increase `A` by one and decrease `B` by 1: Add<3, 2>. Since `B` isn't 0, we run
  // again: Add<4, 1>, and then again: Add<5, 0>. Now that `B` is 0, the recursion
  // terminates and returns the accumulated value of `A` which is 5.
  1: Add<Inc<A>, Dec<B>>;
}[B extends 0 ? 0 : 1];
