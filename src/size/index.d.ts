import { Inc, Tail } from '..';

export type Size<T extends Array<any>, R extends number = 0> = {
  0: R;
  1: Size<Tail<T>, Inc<R>>;
}[T extends [] ? 0 : 1];
