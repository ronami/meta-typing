import { Tail, Head, Unshift, Reverse, Dec } from '..';

export type Slice<
  T extends Array<any>,
  S extends number,
  E extends number,
  R extends Array<any> = []
> = {
  0: Reverse<R>;
  1: Slice<Tail<T>, S, Dec<E>, Unshift<R, Head<T>>>;
  2: Slice<Tail<T>, Dec<S>, E>;
}[T extends [] ? 0 : S extends 0 ? (E extends 0 ? 0 : 1) : 2];
