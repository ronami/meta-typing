import { Add, Tail, Head } from '..';

export type Sum<A extends Array<number>, R extends number = 0> = {
  0: R;
  // @ts-ignore
  1: Sum<Tail<A>, Add<R, Head<A>>>;
}[A extends [] ? 0 : 1];
