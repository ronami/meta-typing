import { Add, Dec, Cast } from '..';

export type Multiply<A extends number, B extends number> = A extends 0
  ? 0
  : B extends 0
  ? 0
  : {
      0: A;
      1: B;
      2: Multiply<A, Dec<B>> extends infer G ? Add<A, Cast<G, number>> : never;
    }[B extends 1 ? 0 : A extends 1 ? 1 : 2];
