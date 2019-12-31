import { Head, Gte, Tail } from '..';

export type Min<T extends Array<number>, R = Head<T>> = {
  0: never;
  1: R;
  2: Min<Tail<T>, R>;
  3: Min<Tail<T>, Head<Tail<T>>>;
}[T extends []
  ? 0
  : T extends [number]
  ? 1
  /* eslint-disable */
  // @ts-ignore
  : Gte<R, Head<Tail<T>>> extends false
  ? 2
  : 3];
  /* eslint-enable */
