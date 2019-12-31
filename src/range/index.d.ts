import { Dec, Unshift } from '..';

export type Range<T extends number, R extends Array<number> = []> = {
  0: R;
  1: Range<Dec<T>, Unshift<R, T>>;
}[T extends 0 ? 0 : 1];
