import { Reverse, Unshift, Tail, Head, Cast } from '..';

// Creates an array of grouped elements, the first of which contains the first elements
// of the given arrays, the second of which contains the second elements of the given
// arrays, and so on: https://lodash.com/docs/4.17.15#zip.
//
type S1 = Zip<[['a', 'b'], [1, 2], [true, false]]>; // [['a', 1, true], ['b', 2, false]]
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Zip<
  // The input array.
  T extends Array<Array<any>>,
  // An accumulator to collect the results.
  R extends Array<any> = []
> = {
  // If the input array is empty or if its first element if an empty array, then return the
  // accumulator array. We're relying that each array in the input array has the same length
  // (it won't work otherwise).
  //
  // We reverse the accumulator since we add elements into it in a reversed order.
  finish: Reverse<R>;
  // Otherwise, run the recursion again on the input array after cutting the first element
  // of each array. Then, insert an array with the first element of each array into the
  // beginning of thhe accumulator.
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: AllTails<T> extends infer G
    ? Zip<Cast<G, Array<any>>, Unshift<R, AllHeads<T>>>
    : never;
}[T extends [] ? 'finish' : T extends [[], ...Array<any>] ? 'finish' : 'next'];

// A helper function that maps over an array and returns a new array with the first element
// of each array.
//
type S2 = AllHeads<[['a', 'b'], [1, 2], [true, false]]>; // ["a", 1, true]
//
type AllHeads<
  // The input array.
  T extends Array<Array<any>>,
  // An accumulator to collect the results.
  R extends Array<any> = []
> = {
  // If the input array is empty, return the accumulator array. We reverse it first
  // since we add elements into it in a reversed order.
  finish: Reverse<R>;
  // Otherwise, run the recursion again on the rest of the array, and insert the first
  // element of the first array into the beginning of the accumulator.
  next: AllHeads<Tail<T>, Unshift<R, Head<Head<T>>>>;
}[T extends [] ? 'finish' : 'next'];

// A helper function that maps over an array and returns a new array with every element
// but the first element of each array.
//
type S3 = AllTails<[['a', 'b'], [1, 2], [true, false]]>; // [["b"], [2], [false]]
//
type AllTails<
  // The input array.
  T extends Array<Array<any>>,
  // An accumulator to collect the results.
  R extends Array<any> = []
> = {
  // If the input array is empty, return the accumulator array. We reverse it first
  // since we add elements into it in a reversed order.
  finish: Reverse<R>;
  // Otherwise, run the recursion again on the rest of the array, and insert the tail
  // (every element but the first element) of the first array into the beginning of the
  // accumulator.
  next: AllTails<Tail<T>, Unshift<R, Tail<Head<T>>>>;
}[T extends [] ? 'finish' : 'next'];
