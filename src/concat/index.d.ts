import { Tail, Head, Reverse, ToTuple, Unshift } from '..';

export type Concat<
  T1 extends any[],
  T2 extends any[],
  R = Reverse<T1>,
  T extends any[] = ToTuple<R>
> = Concat_<T, T2>;

type Concat_<T1 extends any[], T2 extends any[]> = {
  1: Reverse<T1>;
  // @ts-ignore
  0: Concat_<Unshift<T1, Head<T2>>, Tail<T2>>;
}[T2 extends [] ? 1 : 0];
