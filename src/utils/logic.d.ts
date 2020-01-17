import { Tail, Head } from '..';

// https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379092421
export type IsNever<T> = [T] extends [never] ? true : false;

//
export type Cast<A, B> = A extends B ? A : B;

//
export type Not<
  //
  T extends boolean
> =
  //
  T extends true ? false : true;

//
export type And<
  //
  T extends Array<boolean>
> = {
  //
  0: true;
  //
  1: And<Tail<T>>;
  //
  2: false;
}[T extends [] ? 0 : Head<T> extends true ? 1 : 2];
