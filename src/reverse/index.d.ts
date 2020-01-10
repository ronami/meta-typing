import { Head, Tail, Unshift } from '..';

// Reverses array so that the first element becomes the last, the second element
// becomes the second to last, and so on: https://lodash.com/docs/4.17.15#reverse.
//
//   type S = Reverse<[1, 2, 3]>; // [3, 2, 1]
//
export type Reverse<
  //
  T extends Array<any>,
  //
  R extends Array<any> = []
> = {
  //
  0: R;
  //
  1: Reverse<Tail<T>, Unshift<R, Head<T>>>;
}[T extends [] ? 0 : 1];
