import { Tail, Head, Push, Exists } from '..';

export type Difference<
  A extends Array<any>,
  B extends Array<any>,
  R extends Array<any> = []
> = {
  0: R;
  // @ts-ignore
  1: Difference<Tail<A>, B, Push<R, Head<A>>>;
  2: Difference<Tail<A>, B, R>;
}[A extends [] ? 0 : Exists<B, Head<A>> extends false ? 1 : 2];
