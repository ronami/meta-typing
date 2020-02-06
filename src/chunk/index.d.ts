import { Reverse, Unshift, Take, Cast, Drop } from '..';

// Creates an array of elements split into groups the length of size. If array can't
// be split evenly, the final chunk will be the remaining elements:
// https://lodash.com/docs/4.17.15#chunk.
//
//   type S = Chunk<['a', 'b', 'c', 'd'], 2>; // [['a', 'b'], ['c', 'd']]
//
// This type uses recursive type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Chunk<
  // The array to process.
  T extends Array<any>,
  // The length of each chunk.
  S extends number = 1,
  // An accumulator to gather the results.
  R extends Array<Array<any>> = []
> = {
  // If the input array is empty, return the accumulator array. We reverse it first
  // since we add elements into it in a reversed order.
  finish: Reverse<R>;
  // Otherwise, run recursively by inserting the `S` first elements from the input array (`T`)
  // into the accumulator array, and dropping the same number of elements from the beginning
  // of the input array (`T`).
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Unshift<R, Take<T, S>> extends infer G // Assign result to `G`
    ? Drop<T, S> extends infer Z // Assign result to `Z`
      ? Chunk<Cast<Z, Array<any>>, S, Cast<G, Array<any>>>
      : never
    : never;
  // For example, calling Chunk<['a', 'b', 'c', 'd'], 2> will first translate into:
  // Chunk<['c', 'd'], 2, [['a', 'b']]>. Since the input array isn't empty, the recursion ran again
  // by dropping the first two elements from the input array, and inserting them into the accumulator
  // array.
  //
  // Then again, since the input array still wasn't empty, the recursion runs with:
  // Chunk<[], 2, [['c', 'd'], ['a', 'b']]>. The first two elements were dropped from the input array
  // and inserted into the beginning of the accumulator.
  //
  // Finally, since the input array is empty, the reverse accumulator is return which results with:
  // [['a', 'b'], ['c', 'd']].
}[T extends [] ? 'finish' : 'next'];
