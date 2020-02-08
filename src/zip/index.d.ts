import { Inc, Reverse, Unshift, Tail, Head, IsEqual, Cast } from '..';

// Creates an array of grouped elements, the first of which contains the first elements
// of the given arrays, the second of which contains the second elements of the given
// arrays, and so on: https://lodash.com/docs/4.17.15#zip.
//
//   type S = Zip<[['a', 'b'], [1, 2], [true, false]]>; // [['a', 1, true], ['b', 2, false]]
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Zip<
  // The arrays to process.
  T extends Array<Array<any>>,
  //
  N extends number = 0,
  //
  R extends Array<Array<any>> = []
> =
  //
  GetAtIndex<T, N> extends infer G
    ? Zipper<T, N, R, Cast<G, Array<any>>>
    : never;

//
type GetAtIndex<
  //
  B extends Array<Array<any>>,
  //
  C extends number,
  //
  R extends Array<any> = []
> = {
  //
  finish: Reverse<R>;
  //
  next: Unshift<R, Head<B>[C]> extends infer G
    ? GetAtIndex<Tail<B>, C, Cast<G, Array<any>>>
    : never;
}[B extends [] ? 'finish' : 'next'];

//
type AllEqual<T extends Array<any>, E> = {
  //
  finish: true;
  //
  next: AllEqual<Tail<T>, E>;
  //
  bail: false;
}[T extends [] ? 'finish' : IsEqual<Head<T>, E> extends true ? 'next' : 'bail'];

//
type Zipper<
  //
  T extends Array<Array<any>>,
  //
  N extends number,
  //
  R extends Array<Array<any>>,
  //
  F extends Array<any>
> = {
  //
  empty: [];
  //
  finish: Reverse<R>;
  //
  next: Zip<T, Inc<N>, Unshift<R, F>>;
}[T extends []
  ? 'empty'
  : AllEqual<F, undefined> extends true
  ? 'finish'
  : 'next'];
