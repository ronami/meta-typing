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
// For example, the following call Lte<1, 4> will check if either values are `never`. Since
// both aren't `never`, the recursion runs again with Lte<0, 3>. Again none of them are `never`
// so the recursion runs again: Lte<-1, 2> and then again: Lte<never, 1>. Calling Dec<-1>
// returns `never` since -1 is the limit Dec can calculate. Next call to Lte will return true
// since `A` equals to the `never` type.
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
