import { Inc, IsNever } from '..';

// Checks if `A` is greater than or equal to `B`: https://lodash.com/docs/4.17.15#gte.
//
//   type S = Gte<3, 1>; // true
//
// Since TypeScript's type system has no concept of arithmetic, we try incrementing both `A`
// and `B` by 1 every time the recursion runs. The first one to equal the `never` type is
// is the larger one.
//
// We're relying on how we implemented the `Inc` method: If a value is out of scope (larger
// than 10) we return `never`. Similarily to how the `Infinity` value works in JavaScript.
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
export type Gte<
  // Accept two numbers two compare, should return `true` if `A` is bigger than or equals to
  // `B`.
  A extends number,
  B extends number
> = {
  // If `A` is `never` then it's bigger (or equal, since we didn't check `B` yet), return
  // `true`:
  greater: true;
  // Otherwise, if `B` is `never`, return false since it's bigger than `A`:
  smaller: false;
  // None of them are `never`? Run again by increasing both by 1:
  next: Gte<Inc<A>, Inc<B>>;
  // For example, calling Gte<9, 7> first checks if any of the values are `never`. Since that's
  // false, the recursion increases both by 1 and runs again with: Gte<10, 8>.
  //
  // Then again, since both numbers don't equal `never`, the recursion increases both by 1 and
  // runs again: Gte<never, 9>.
  //
  // Finally, after 10 was increased by 1 and went out of calculation range, it now has the value
  // of `never`. Because it reached the `never` value first, the recursion terminates and returns
  // `true`.
}[IsNever<A> extends true
  ? 'greater'
  : IsNever<B> extends true
  ? 'smaller'
  : 'next'];
