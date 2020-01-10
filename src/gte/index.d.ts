import { Inc, IsNever } from '..';

// Checks if `A` is greater than or equal to `B`: https://lodash.com/docs/4.17.15#gte.
//
//   type S = Gte<3, 1>; // true
//
// Since TypeScript's type system has no concept of arithmetic, we try incrementing both `A`
// and `B` by 1 every time the recursion runs. The first one to equal the `never` type is
// is the larger one.
//
// This is relying on how we implemented the `Inc` method: If a value is out of scope (larger
// than 10) we return `never`. Similarily to how the `Infinity` value works in JavaScript.
//
// For example, the following call Gte<9, 7> will check if either values are `never`. Since
// both aren't `never`, the recursion runs again with Gte<10, 8>. Again none of them are `never`
// so the recursion runs again: Gte<never, 9>. Calling Add<10> returns `never` since 10 is the
// limit Add can calculate. Next call to Gte will return true since `A` equals to the `never`
// type.
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
}[IsNever<A> extends true ? 0 : IsNever<B> extends true ? 1 : 2];
