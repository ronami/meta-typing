import { Acc, IsNever } from '..';

export type Gte<A extends number, B extends number> = {
  0: true;
  1: false;
  2: Gte<Acc<A>, Acc<B>>;
}[IsNever<A> extends true ? 0 : IsNever<B> extends true ? 1 : 2];
