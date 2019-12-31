import { Tail, Head, Concat } from '..';

export type Chunk<T extends Array<any>> = T extends []
  ? []
  : {
      0: [[Head<T>]];
      // @ts-ignore
      1: Concat<[[Head<T>, Head<Tail<T>>]], Chunk<Tail<Tail<T>>>>;
    }[T extends [any] ? 0 : 1];
