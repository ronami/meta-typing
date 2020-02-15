import { Dec, IsNever } from '..';

// Checks if `A` is less than `B`: https://lodash.com/docs/4.17.15#lte.
//
type S = Lt<2, 3>; // true
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
export type Lt<
  // Accept two numbers two compare, should return `true` if `A` is smaller than `B`.
  A extends number,
  B extends number
> = {
  // If `A` is `never` then it's smaller (or equal, since we didn't check `B` yet), return
  // `true`:
  greater: false;
  // Otherwise, if `B` is `never`, return false since it's smaller than `A`:
  smaller: true;
  // None of them are `never`? Run again by decreasing both by 1:
  next: Lt<Dec<A>, Dec<B>>;
  // For example, calling Lt<2, 1> first checks if any of the values are `never`. Since that's
  // false, the recursion decrease both by 1 and runs again with: Lt<1, 0>.
  //
  // Then again, since both numbers don't equal `never`, the recursion decrease both by 1 and
  // runs again: Lt<0, never>.
  //
  // Finally, after 0 was decrease by 1 and went out of calculation range, it now has the value
  // of `never`. Because it reached the `never` value first, the recursion terminates and returns
  // `false`.
}[IsNever<A> extends true
  ? IsNever<B> extends true
    ? 'greater'
    : 'smaller'
  : 'next'];
