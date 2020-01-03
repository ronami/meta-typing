import { Head, Tail, IsEqual, Inc } from '..';

export type IndexOf<T extends Array<any>, E, R extends number = 0> = {
  0: -1;
  1: R;
  2: IndexOf<Tail<T>, E, Inc<R>>;
}[T extends [] ? 0 : IsEqual<Head<T>, E> extends true ? 1 : 2];
