import { Reverse } from '..';

export type Push<
  Tuple extends Array<any>,
  Element,
  R = Reverse<Tuple>,
  T extends Array<any> = ToTuple<R>
> = Reverse<Unshift<T, Element>>;

export type ToTuple<T> = T extends Array<any> ? T : Array<any>;

export type Unshift<Tuple extends Array<any>, Element> = ((
  h: Element,
  ...t: Tuple
) => void) extends (...t: infer R) => void
  ? R
  : never;

// https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379092421
export type IsNever<T> = [T] extends [never] ? true : false;

export type Cast<A, B> = A extends B ? A : B;
