import { Tail, Head, Unshift, Reverse } from '..';

export type Compact<
  T extends Array<any>,
  R extends Array<any> = []
> = T extends []
  ? Reverse<R>
  : {
      0: Compact<Tail<T>, Unshift<R, Head<T>>>;
      1: Compact<Tail<T>, R>;
    }[Head<T> extends 0
      ? 1
      : Head<T> extends null
      ? 1
      : Head<T> extends undefined
      ? 1
      : Head<T> extends false
      ? 1
      : Head<T> extends ''
      ? 1
      : 0];
