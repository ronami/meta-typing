import { Inc, IsNever } from '..';

export type Lte<A extends number, B extends number> = {
  0: false;
  1: true;
  2: Lte<Inc<A>, Inc<B>>;
}[IsNever<A> extends true ? (IsNever<B> extends true ? 1 : 0) : 2];
