import { Dec } from '..';

// Substracts two numbers: https://lodash.com/docs/4.17.15#subtract.
//
//   type S = Substract<5, 2>; // 3
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
  // For example, Substract<3, 2> will first translate into another Substract call that will
  // decrease both `A`'s and `B`'s value by 1: Substract<2, 1>. Since `B` isn't 0, we run
  // again: Substract<1, 0>. Now that `B` is 0, the recursion terminates and returns the
  // value of `A` which is 1.
  1: Substract<Dec<A>, Dec<B>>;
}[B extends 0 ? 0 : 1];
