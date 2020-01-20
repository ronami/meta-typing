import { Inc, IsNever } from '..';

// Checks if `A` is less than or equal to `B`: https://lodash.com/docs/4.17.15#lte.
//
//   type S = Lte<1, 3>; // true
//
// Since TypeScript's type system has no concept of arithmetic, we try decreasing both `A`
// and `B` by 1 every time the recursion runs. The first one to equal the `never` type is
// is the smaller one.
//
// This is relying on how we implemented the `Dec` method: If a value is out of scope (smaller
// than -1) we return `never`. Similarily to how the `-Infinity` value works in JavaScript.
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
export type Lte<
  // Accept two numbers two compare, should return `true` if `A` is smaller than or equals to
  // `B`.
  A extends number,
  B extends number
> = {
  // If `A` is `never` then it's smaller (or equal, since we didn't check `B` yet), return
  // `true`:
  0: false;
  // Otherwise, if `B` is `never`, return false since it's smaller than `A`:
  1: true;
  // None of them are `never`? Run again by decreasing both by 1:
  2: Lte<Inc<A>, Inc<B>>;
  // For example, calling Lte<9, 7> first checks if any of the values are `never`. Since that's
  // false, the recursion increases both by 1 and runs again with: Lte<10, 8>.
  //
  // Then again, since both numbers don't equal `never`, the recursion increases both by 1 and
  // runs again: Gte<never, 9>.
  //
  // Finally, after 10 was increased by 1 and went out of calculation range, it now has the value
  // of `never`. Because it reached the `never` value first, the recursion terminates and returns
  // `false`.
}[IsNever<A> extends true ? (IsNever<B> extends true ? 1 : 0) : 2];
