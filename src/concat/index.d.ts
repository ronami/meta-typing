import { Head, Tail, Unshift, Reverse, Cast } from '..';

// Creates a new array by concatenating two arrays together:
// https://lodash.com/docs/4.17.15#concat.
//
//   type S = Concat<[1, 2, 3], [4, 5, 6]>; // [1, 2, 3, 4, 5, 6]
//
// This type uses recursive type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Concat<
  // The first array to concatenate.
  T1 extends Array<any>,
  // The second array to concatenate.
  T2 extends Array<any>
> =
  //
  Reverse<T1> extends infer G ? Concatenation<Cast<G, Array<any>>, T2> : never;

//
type Concatenation<T1 extends Array<any>, T2 extends Array<any>> = {
  //
  finish: Reverse<T1>;
  //
  next: Concatenation<Unshift<T1, Head<T2>>, Tail<T2>>;
}[T2 extends [] ? 'finish' : 'next'];
