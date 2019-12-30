import { Tail, Head, Push } from '..';

export type Compact<
  T extends Array<any>,
  R extends Array<any> = []
> = T extends []
  ? R
  : {
      // @ts-ignore
      0: Compact<Tail<T>, Push<R, Head<T>>>;
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
