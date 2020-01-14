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
// one of it's properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is essentially the same as writting: `T extends H ? A : B`. If this type is using
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
  // For example, calling Gte<9, 7> will check if either value is `never`. Since both 9 and 7
  // don't equal `never`, the recursion continues with Gte<10, 8>.
  //
  // Since none of them are `never` again, the recursion runs again with: Gte<never, 9>.
  // Calling Add<10> returns `never` since 10 is the limit `Add` can calculate, the next call
  // to Gte will return `true` since `A` equals to the `never` type.
}[IsNever<A> extends true ? 0 : IsNever<B> extends true ? 1 : 2];
