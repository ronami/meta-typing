import { Head, Tail, Dec } from '..';

export type Nth<T extends Array<any>, R extends number = 0> = {
  0: undefined;
  1: Head<T>;
  2: Nth<Tail<T>, Dec<R>>;
}[T extends [] ? 0 : R extends 0 ? 1 : 2];
