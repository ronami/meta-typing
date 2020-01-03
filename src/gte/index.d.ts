import { Inc, IsNever } from '..';

export type Gte<A extends number, B extends number> = {
  0: true;
  1: false;
  2: Gte<Inc<A>, Inc<B>>;
}[IsNever<A> extends true ? 0 : IsNever<B> extends true ? 1 : 2];
