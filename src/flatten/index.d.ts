import { Tail, Head, Unshift, Concat, Cast, Reverse } from '..';

//
type Push<T extends Array<any>, E> =
  //
  Reverse<T> extends infer G ? Reverse<Unshift<Cast<G, Array<any>>, E>> : never;

// Flattens an array a single level deep: https://lodash.com/docs/4.17.15#flatten.
//
//   type S = Flatten<[1, [2, [3, [4]], 5]]>; // [1, 2, [3, [4]], 5]
//
export type Flatten<
  //
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
