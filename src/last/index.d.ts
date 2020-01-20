import { Tail, Head } from '..';

// Gets the last element of an array: https://lodash.com/docs/4.17.15#last.
//
//   type S = Last<[1, 2, 3]>; // 3
//
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
export type Last<
  // The array to query.
  A extends Array<any>
> = {
  // If the array is empty then there is no last element and we simply return `undefined`:
  0: undefined;
  // Next, check if the array has only 1 element in it. If that's the case, that element is
  // the last element, simply return it as the result:
  1: Head<A>;
  // Otherwise, then the next element isn't the last and we run the recursion again with the
  // rest of the array:
  2: Last<Tail<A>>;
}[A extends [] ? 0 : A extends [any] ? 1 : 2];
