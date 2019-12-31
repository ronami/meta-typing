import { Head, Gte, Tail } from '..';

export type Max<T extends Array<number>, R = Head<T>> = {
  0: never;
  1: R;
  2: Max<Tail<T>, R>;
  3: Max<Tail<T>, Head<Tail<T>>>;
}[T extends []
  ? 0
  : T extends [number]
  ? 1
  /* eslint-disable */
  // @ts-ignore
  : Gte<R, Head<Tail<T>>> extends true
  ? 2
  : 3];
  /* eslint-enable */
