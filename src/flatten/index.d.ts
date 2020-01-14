import { Tail, Head, Unshift, Concat, Cast, Reverse } from '..';

//
type Push<T extends Array<any>, E> =
  //
  Reverse<T> extends infer G ? Reverse<Unshift<Cast<G, Array<any>>, E>> : never;

// Flattens an array a single level deep: https://lodash.com/docs/4.17.15#flatten.
//
//   type S = Flatten<[1, [2, [3, [4]], 5]]>; // [1, 2, [3, [4]], 5]
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
export type Flatten<
  // The array to flatten.
  T extends Array<any>,
  //
  R extends Array<any> = [],
  //
  G extends Array<any> = Head<T>,
  //
  H extends Array<any> = Tail<T>
> = {
  //
  0: R;
  //
  1: Concat<R, G> extends infer F ? Flatten<H, Cast<F, Array<any>>> : never;
  //
  2: Push<R, G> extends infer F ? Flatten<H, Cast<F, Array<any>>> : never;
}[T extends [] ? 0 : G extends Array<any> ? 1 : 2];
