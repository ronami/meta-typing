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
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Lte<
  // Accept two numbers two compare, should return `true` if `A` is smaller than or equals to
  // `B`.
  A extends number,
  B extends number
> = {
  // If `A` is `never` then it's smaller (or equal, since we didn't check `B` yet), return
  // `true`:
  greater: false;
  // Otherwise, if `B` is `never`, return false since it's smaller than `A`:
  smaller: true;
  // None of them are `never`? Run again by decreasing both by 1:
  next: Lte<Inc<A>, Inc<B>>;
  // For example, calling Lte<9, 7> first checks if any of the values are `never`. Since that's
  // false, the recursion increases both by 1 and runs again with: Lte<10, 8>.
  //
  // Then again, since both numbers don't equal `never`, the recursion increases both by 1 and
  // runs again: Gte<never, 9>.
  //
  // Finally, after 10 was increased by 1 and went out of calculation range, it now has the value
  // of `never`. Because it reached the `never` value first, the recursion terminates and returns
  // `false`.
}[IsNever<A> extends true
  ? IsNever<B> extends true
    ? 'smaller'
    : 'greater'
  : 'next'];
