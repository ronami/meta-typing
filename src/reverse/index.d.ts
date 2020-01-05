import { Head, Tail, Unshift } from '..';

export type Reverse<T extends Array<any>, R extends Array<any> = []> = {
  0: R;
  1: Reverse<Tail<T>, Unshift<R, Head<T>>>;
}[T extends [] ? 0 : 1];
