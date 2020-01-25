import { Dec } from '..';

// Subtracts two numbers: https://lodash.com/docs/4.17.15#subtract.
//
//   type S = Subtract<5, 2>; // 3
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
export type Subtract<
  // Accept two numbers two subtract from one another.
  A extends number,
  B extends number
> = {
  // If `B`'s value is 0 then we're done, just return `A`.
  finish: A;
  // Otherwise, call `Subtract` recursively while decreasing `A`'s value by 1 and also
  // decreasing `B`'s value by 1. Eventually `B` will be 0 and the recursion will terminate.
  //
  // For example, Subtract<3, 2> will first translate into another `Subtract` call that will
  // decrease both `A`'s and `B`'s value by 1: Subtract<2, 1>.
  //
  // Then, since `B`'s value isn't 0, the recursion runs again: Subtract<1, 0>.
  //
  // Finally, now that `B`'s value is 0, the recursion terminates and returns the
  // value of `A` which is 1.
  next: Subtract<Dec<A>, Dec<B>>;
}[B extends 0 ? 'finish' : 'next'];
