import { Tail, Unshift, Head, Reverse } from '..';

// Gets all but the last element of an array: https://lodash.com/docs/4.17.15#initial.
//
//   type S = Initial<[1, 2]>; // 1
//
// This type uses recursive type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Initial<
  // The input array.
  A extends Array<any>,
  // An internal array to accumulate akl but the last element of the array. When
  // the recursion ends, it will be returned.
  R extends Array<any> = []
> = {
  // If the input array is empty, return the accumulator array. We reverse it first
  // since we add elements into it in a reversed order.
  finish: Reverse<R>;
  // Otherwise, check if the input array is an array with only 1 value. If it is,
  // then we reached the last element and we should skip it by returning the accumulator
  // array. If it's not the last element yet, insert the first element of `A` into the
  // accumulator and run the recursion again with the rest of the array:
  next: Initial<Tail<A>, Unshift<R, Head<A>>>;
}[A extends [] ? 'finish' : A extends [any] ? 'finish' : 'next'];
