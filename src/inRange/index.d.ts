import { Gte, Lte } from '..';

export type InRange<A extends number, S extends number, E extends number> = Gte<
  A,
  S
> extends true
  ? Lte<A, E> extends true
    ? true
    : false
  : false;
