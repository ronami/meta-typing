import { Tail, Head, IsEqual } from '..';

export type Includes<T extends Array<any>, E> = T extends []
  ? false
  : {
      0: true;
      1: Includes<Tail<T>, E>;
    }[IsEqual<Head<T>, E> extends true ? 0 : 1];
