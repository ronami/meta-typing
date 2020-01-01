import { Acc, Dec, Reverse, Unshift, Tail, Head, Size } from '..';

type GetAllAt<
  B extends Array<Array<any>>,
  C extends number,
  R extends Array<number> = []
> = {
  0: Reverse<R>;
  // @ts-ignore
  1: GetAllAt<Tail<B>, C, Unshift<R, Head<B>[C]>>;
}[B extends [] ? 0 : 1];

export type Zip<
  T extends Array<Array<any>>,
  N extends number = Size<T>,
  R extends Array<Array<any>> = []
> = T extends []
  ? []
  : {
      0: R;
      1: Zip<T, Dec<N>, Unshift<R, GetAllAt<T, Dec<N>>>>;
    }[N extends 0 ? 0 : 1];

type R = Zip<[[1, 2, 3], [4, 5, 6]]>;
