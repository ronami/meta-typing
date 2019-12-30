import { Tail, Head, Push, Concat } from '..';

export type Flatten<
  T extends Array<any>,
  R extends Array<any> = []
> = T extends []
  ? R
  : {
      // @ts-ignore
      0: Flatten<Tail<T>, Concat<R, Head<T>>>;
      // @ts-ignore
      1: Flatten<Tail<T>, Push<R, Head<T>>>;
    }[Head<T> extends Array<any> ? 0 : 1];
