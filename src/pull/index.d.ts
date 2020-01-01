import { Head, Tail, Includes, Unshift, Reverse } from '..';

export type Pull<
  T extends Array<any>,
  D extends Array<any>,
  R extends Array<any> = []
> = {
  0: Reverse<R>;
  1: Pull<Tail<T>, D, R>;
  2: Pull<Tail<T>, D, Unshift<R, Head<T>>>;
}[T extends [] ? 0 : Includes<D, Head<T>> extends true ? 1 : 2];
