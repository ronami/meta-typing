import { Tail, Head, Unshift, Concat, Cast, Reverse } from '..';

//
type Push<T extends Array<any>, E> =
  //
  Reverse<T> extends infer G ? Reverse<Unshift<Cast<G, Array<any>>, E>> : never;

// Flattens an array a single level deep: https://lodash.com/docs/4.17.15#flatten.
//
//   type S = Flatten<[1, [2, [3, [4]], 5]]>; // [1, 2, [3, [4]], 5]
//
// This type uses recursive type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
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
  finish: R;
  //
  'next-array': Concat<R, G> extends infer F
    ? Flatten<H, Cast<F, Array<any>>>
    : never;
  //
  next: Push<R, G> extends infer F ? Flatten<H, Cast<F, Array<any>>> : never;
}[T extends [] ? 'finish' : G extends Array<any> ? 'next-array' : 'next'];
