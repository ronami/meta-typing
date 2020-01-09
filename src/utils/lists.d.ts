import { Tail, Includes, Head } from '..';

export type InEvery<T extends Array<Array<any>>, E> = {
  0: true;
  1: false;
  2: InEvery<Tail<T>, E>;
}[T extends [] ? 0 : Includes<Head<T>, E> extends true ? 2 : 1];

export type Unshift<Tuple extends Array<any>, Element> = ((
  h: Element,
  ...t: Tuple
) => void) extends (...t: infer R) => void
  ? R
  : never;

// https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379092421
export type IsNever<T> = [T] extends [never] ? true : false;

export type Cast<A, B> = A extends B ? A : B;
