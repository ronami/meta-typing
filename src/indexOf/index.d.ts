import { Head, Tail, IsEqual, Acc } from '..';

export type IndexOf<T extends Array<any>, E, R extends number = 0> = {
  0: -1;
  1: R;
  2: IndexOf<Tail<T>, E, Acc<R>>;
}[T extends [] ? 0 : IsEqual<Head<T>, E> extends true ? 1 : 2];
