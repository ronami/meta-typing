import { Gte, Lte } from '..';

export type Clamp<A extends number, L extends number, U extends number> = Gte<
  A,
  U
> extends true
  ? U
  : Lte<A, L> extends true
  ? L
  : A;
