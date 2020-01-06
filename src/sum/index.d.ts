import { Add, Tail, Head, Cast } from '..';

export type Sum<A extends Array<number>, R extends number = 0> = {
  0: R;
  1: Add<R, Head<A>> extends infer G ? Sum<Tail<A>, Cast<G, number>> : never;
}[A extends [] ? 0 : 1];
