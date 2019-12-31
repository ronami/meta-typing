import { Tail, Head, Push, Includes } from '..';

export type Uniq<T extends Array<any>, R extends Array<any> = []> = {
  0: R;
  1: Includes<R, Head<T>> extends true
    ? Uniq<Tail<T>, R>
    /* eslint-disable */
    // @ts-ignore
    : Uniq<Tail<T>, Push<R, Head<T>>>;
    /* eslint-enable */
}[T extends [] ? 0 : 1];
