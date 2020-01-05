import { Inc, IsNever } from '..';

// Checks if `A` is less than or equal to `B`: https://lodash.com/docs/4.17.15#lte.
//
// Since TypeScript's type system has no concept of arithmetic, we try decreasing both `A`
// and `B` by 1 every time the recursion runs. The first one to equal the `never` type is
// is the smaller one.
//
// This is relying on how we implemented the `Dec` method: If a value is out of scope (smaller
// than -1) we return `never`. Similarily to how the `-Infinity` value works in JavaScript.
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
}[IsNever<A> extends true ? (IsNever<B> extends true ? 1 : 0) : 2];
