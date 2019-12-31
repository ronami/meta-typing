import { Add, Dec } from '..';

export type Multiply<A extends number, B extends number> = A extends 0
  ? 0
  : B extends 0
  ? 0
  : {
      0: A;
      1: B;
      // @ts-ignore
      2: Add<A, Multiply<A, Dec<B>>>;
    }[B extends 1 ? 0 : A extends 1 ? 1 : 2];
