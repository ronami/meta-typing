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

// Notice that the function is implemented with an object and a ternary check that accesses
// one of its properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is the same as writing: `T extends H ? A : B`. If the condition is true then
// `A` is returned because it's referenced by the `0` key. Otherwise it's `B` that's returned
// since it's referenced by the `1` key.
//
// TypScript's type system doesn't support recursive types and the above example is a way
// of going around it. Please note that it's not something TypeScript officially supports:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type InEvery<T extends Array<Array<any>>, E> = {
  0: true;
  1: false;
  2: InEvery<Tail<T>, E>;
}[T extends [] ? 0 : Includes<Head<T>, E> extends true ? 2 : 1];
