import { Dec, Concat, Unshift, Cast } from '..';

//
export type Hanoi<
  //
  N extends number,
  //
  A,
  //
  B,
  //
  C
> = {
  //
  0: [];
  //
  1: Hanoi<Dec<N>, C, B, A> extends infer H
    ? Unshift<Cast<H, Array<any>>, [A, B]> extends infer G
      ? Hanoi<Dec<N>, A, C, B> extends infer F
        ? Concat<Cast<F, Array<any>>, Cast<G, Array<any>>>
        : never
      : never
    : never;
}[N extends 0 ? 0 : 1];
