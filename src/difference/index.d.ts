import { Tail, Head, Unshift, InEvery, Reverse } from '..';

// Creates an array of array values not included in the other given arrays:
// https://lodash.com/docs/4.17.15#difference.
//
//   type S = Difference<[[1, 2, 3], [2, 3, 4]]>; // [1]
//
export type Difference<T extends Array<Array<any>>> = T extends []
  ? []
  : Head<T> extends []
  ? []
  : Diff<Head<T>, Tail<T>>;

type Diff<
  T extends Array<any>,
  G extends Array<Array<any>>,
  R extends Array<any> = []
> = {
  0: Reverse<R>;
  1: Diff<Tail<T>, G, Unshift<R, Head<T>>>;
  2: Diff<Tail<T>, G, R>;
}[T extends [] ? 0 : InEvery<G, Head<T>> extends false ? 1 : 2];
