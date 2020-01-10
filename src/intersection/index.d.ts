import { Tail, Head, Unshift, InEvery, Reverse } from '..';

// Creates an array of unique values that are included in all given arrays:
// https://lodash.com/docs/4.17.15#intersection.
//
//   type S = Intersection<[[1, 2, 3], [2, 3, 4]]>; // [2, 3]
//
export type Intersection<T extends Array<Array<any>>> = T extends []
  ? []
  : Head<T> extends []
  ? []
  : Intersect<Head<T>, Tail<T>>;

type Intersect<
  T extends Array<any>,
  G extends Array<Array<any>>,
  R extends Array<any> = []
> = {
  0: Reverse<R>;
  1: Intersect<Tail<T>, G, Unshift<R, Head<T>>>;
  2: Intersect<Tail<T>, G, R>;
}[T extends [] ? 0 : InEvery<G, Head<T>> extends true ? 1 : 2];
