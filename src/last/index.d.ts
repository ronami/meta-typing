import { Tail, Head } from '..';

// Gets the last element of an array: https://lodash.com/docs/4.17.15#last.
//
//   type S = Last<[1, 2, 3]>; // 3
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Last<
  // The array to query.
  A extends Array<any>
> = {
  // If the array is empty then there is no last element and we simply return `undefined`:
  empty: undefined;
  // Next, check if the array has only 1 element in it. If that's the case, that element is
  // the last element, simply return it as the result:
  finish: Head<A>;
  // Otherwise, then the next element isn't the last and we run the recursion again with the
  // rest of the array:
  next: Last<Tail<A>>;
}[A extends [] ? 'empty' : A extends [any] ? 'finish' : 'next'];
