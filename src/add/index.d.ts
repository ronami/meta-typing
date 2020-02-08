import { Inc, Dec } from '..';

// Adds two numbers: https://lodash.com/docs/4.17.15#add.
//
//   type S = Add<6, 4>; // 10
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Add<
  // Accept two numbers two add together.
  A extends number,
  B extends number
> = {
  // If `B`'s value is 0 then we're done, just return `A`.
  finish: A;
  // Otherwise, call `Add` recursively while increasing `A`'s value by 1 and decreasing
  // `B`'s value by 1. Eventually, `B`'s value will be 0 and the recursion will terminate.
  next: Add<Inc<A>, Dec<B>>;
  // For example, Add<3, 2> will first translate into another `Add` call that will
  // increase `A`'s value by 1 and decrease `B`'s value by 1: Add<4, 1>.
  //
  // Then, since `B`'s value isn't 0 (it's 1), the recursion runs again: Add<5, 0>.
  //
  // Finally, now that `B`'s value is 0, the recursion terminates and returns the
  // accumulated value of `A` which is 5.
}[B extends 0 ? 'finish' : 'next'];
