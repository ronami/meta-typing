import { Tail, Head, Push, Includes } from '..';

export type Difference<
  A extends Array<any>,
  B extends Array<any>,
  R extends Array<any> = []
> = {
  0: R;
  // @ts-ignore
  1: Difference<Tail<A>, B, Push<R, Head<A>>>;
  2: Difference<Tail<A>, B, R>;
}[A extends [] ? 0 : Includes<B, Head<A>> extends false ? 1 : 2];
