import { Inc, Reverse, Unshift, Tail, Head, IsEqual, Cast } from '..';

// Creates an array of grouped elements, the first of which contains the first elements
// of the given arrays, the second of which contains the second elements of the given
// arrays, and so on: https://lodash.com/docs/4.17.15#zip.
//
//   type S = Zip<[['a', 'b'], [1, 2], [true, false]]>; // [['a', 1, true], ['b', 2, false]]
//
// Notice that the function is implemented with an object and a ternary check that accesses
// one of its properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is essentially the same as writing: `T extends H ? A : B`. If this type is using
// recursion, using the latter approach quickly results with type errors of infinite recursion
// so the first option is used to avoid false compiler errors.
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
  0: Reverse<R>;
  //
  1: Unshift<R, Head<B>[C]> extends infer G
    ? GetAtIndex<Tail<B>, C, Cast<G, Array<any>>>
    : never;
}[B extends [] ? 0 : 1];

//
type AllEqual<T extends Array<any>, E> = {
  //
  0: true;
  //
  1: AllEqual<Tail<T>, E>;
  //
  2: false;
}[T extends [] ? 0 : IsEqual<Head<T>, E> extends true ? 1 : 2];

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
  0: [];
  //
  1: Reverse<R>;
  //
  2: Zip<T, Inc<N>, Unshift<R, F>>;
}[T extends [] ? 0 : AllEqual<F, undefined> extends true ? 1 : 2];
