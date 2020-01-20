import { Inc, Dec } from '..';

// Adds two numbers: https://lodash.com/docs/4.17.15#add.
//
//   type S = Add<6, 4>; // 10
//
// Notice that the function is implemented with an object and a ternary check that accesses
// one of its properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is the same as writing: `T extends H ? A : B`. If the condition is true then
// `A` is returned because it's referenced by the `0` key. Otherwise it's `B` that's returned
// since it's referenced by the `1` key.
//
// TypScript's type system doesn't support recursive types and the above example is a way
// of going around it. Please note that it's not something TypeScript officially supports:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Add<
  // Accept two numbers two add together.
  A extends number,
  B extends number
> = {
  // If `B` is 0 then we're done, just return `A`.
  0: A;
  // Otherwise, call `Add` recursively while increasing `A`'s value by 1 and decreasing
  // `B`'s value by 1. Eventually, `B`'s value will be 0 and the recursion will terminate.
  //
  // For example, Add<3, 2> will first translate into another `Add` call that will
  // increase `A`'s value by 1 and decrease `B`'s value by 1: Add<4, 1>.
  //
  // Then, since `B` isn't 0 (it's 1), the recursion runs again: Add<5, 0>.
  //
  // Finally, now that `B`'s value is 0, the recursion terminates and returns the
  // accumulated value of `A` which is 5.
  1: Add<Inc<A>, Dec<B>>;
}[B extends 0 ? 0 : 1];
