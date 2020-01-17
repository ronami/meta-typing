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
// This is essentially the same as writing: `T extends H ? A : B`. If this type is using
// recursion, using the latter approach quickly results with type errors of infinite recursion
// so the first option is used to avoid false compiler errors.
export type Gte<
  // Accept two numbers two compare, should return `true` if `A` is bigger than or equals to
  // `B`.
  A extends number,
  B extends number
> = {
  // If `A` is `never` then it's bigger (or equal, since we didn't check `B` yet), return
  // `true`:
  0: true;
  // Otherwise, if `B` is `never`, return false since it's bigger than `A`:
  1: false;
  // None of them are `never`? Run again by increasing both by 1:
  2: Gte<Inc<A>, Inc<B>>;
  // For example, calling Gte<9, 7> first checks if any of the values are `never`. Since that's
  // false, the recursion increases both by 1 and runs again with: Gte<10, 8>.
  //
  // Then again, since both numbers don't equal `never`, the recursion increases both by 1 and
  // runs again: Gte<never, 9>.
  //
  // Finally, after 10 was increased by 1 and went out of calculation range, it now has the value
  // of `never`. Because it reached the `never` value first, the recursion terminates and returns
  // `true`.
}[IsNever<A> extends true ? 0 : IsNever<B> extends true ? 1 : 2];
