import { Head, Tail, Unshift, Reverse, Cast } from '..';

// Creates a new array by concatenating two arrays together:
// https://lodash.com/docs/4.17.15#concat.
//
//   type S = Concat<[1, 2, 3], [4, 5, 6]>; // [1, 2, 3, 4, 5, 6]
//
// Notice that the function is implemented with an object and a ternary check that accesses
// one of its properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is the same as writing: `T extends H ? A : B`. If the condition is true then
// `A` is returned because it's referenced by the `0` key. Otherwise it's `B` that's returned
// since it's referenced by the `1` key.
//
// TypScript's type system doesn't support recursive types and the above example is a way
// of going around it. Please note that it's not something TypeScript officially supports:
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
  1: Reverse<T1>;
  //
  0: Concatenation<Unshift<T1, Head<T2>>, Tail<T2>>;
}[T2 extends [] ? 1 : 0];
