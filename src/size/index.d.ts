import { Acc, Tail } from '..';

export type Size<T extends Array<any>, R extends number = 0> = {
  0: R;
  1: Size<Tail<T>, Acc<R>>;
}[T extends [] ? 0 : 1];
