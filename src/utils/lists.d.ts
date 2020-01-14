import { Tail, Includes, Head } from '..';

// Adds an element of the beginning of an array:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift.
//
//   type S = Unshift<[1, 2, 3], 0>; // [0, 1, 2, 3]
//
export type Unshift<
  // The input array.
  T extends Array<any>,
  // The element to insert.
  E
> =
  // We define a function that takes an argument of type `E` and other arguments of type `T` (an
  // array of arguments) and returns void. Then, we use a condition that will always be true, by
  // checking if this function extends another function of the same type.
  //
  // We do that to combine, both the type of `E` and the type of `T` into one array with the `infer` keyword
  // (https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types)
  // which is returned eventually.
  ((h: E, ...t: T) => void) extends (...t: infer R) => void ? R : never;

//
export type InEvery<T extends Array<Array<any>>, E> = {
  0: true;
  1: false;
  2: InEvery<Tail<T>, E>;
}[T extends [] ? 0 : Includes<Head<T>, E> extends true ? 2 : 1];

// https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379092421
export type IsNever<T> = [T] extends [never] ? true : false;

//
export type Cast<A, B> = A extends B ? A : B;
