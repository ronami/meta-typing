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

export type Acc<T extends number> = T extends 0
  ? 1
  : T extends 1
  ? 2
  : T extends 2
  ? 3
  : T extends 3
  ? 4
  : T extends 4
  ? 5
  : T extends 5
  ? 6
  : T extends 6
  ? 7
  : T extends 7
  ? 8
  : T extends 8
  ? 9
  : T extends 9
  ? 10
  : never;

export type Dec<T extends number> = T extends 10
  ? 9
  : T extends 9
  ? 8
  : T extends 8
  ? 7
  : T extends 7
  ? 6
  : T extends 6
  ? 5
  : T extends 5
  ? 4
  : T extends 4
  ? 3
  : T extends 3
  ? 2
  : T extends 2
  ? 1
  : T extends 1
  ? 0
  : never;

// https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379092421
export type IsNever<T> = [T] extends [never] ? true : false;
