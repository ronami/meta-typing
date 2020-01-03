import { Inc, Reverse, Unshift, Tail, Head, IsEqual } from '..';

type GetAtIndex<
  B extends Array<Array<any>>,
  C extends number,
  R extends Array<number> = []
> = {
  0: Reverse<R>;
  // @ts-ignore
  1: GetAtIndex<Tail<B>, C, Unshift<R, Head<B>[C]>>;
}[B extends [] ? 0 : 1];

type AllEqual<T extends Array<any>, E> = T extends []
  ? true
  : {
      0: AllEqual<Tail<T>, E>;
      1: false;
    }[IsEqual<Head<T>, E> extends true ? 0 : 1];

// @ts-ignore
export type Zip<
  T extends Array<Array<any>>,
  N extends number = 0,
  R extends Array<Array<any>> = [],
  F extends Array<any> = GetAtIndex<T, N>
> = T extends []
  ? []
  : {
      0: Reverse<R>;
      // @ts-ignore
      1: Zip<T, Inc<N>, Unshift<R, GetAtIndex<T, N>>>;
    }[AllEqual<F, undefined> extends true ? 0 : 1];
