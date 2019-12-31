import { Tail, Head, Includes, Unshift, Reverse } from '..';

export type Uniq<T extends Array<any>, R extends Array<any> = []> = {
  0: Reverse<R>;
  1: Includes<R, Head<T>> extends true
    ? Uniq<Tail<T>, R>
    : Uniq<Tail<T>, Unshift<R, Head<T>>>;
}[T extends [] ? 0 : 1];
