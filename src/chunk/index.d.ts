import { Reverse, Unshift, Take, Cast, Drop } from '..';

// Creates an array of elements split into groups the length of size. If array can't
// be split evenly, the final chunk will be the remaining elements:
// https://lodash.com/docs/4.17.15#chunk.
//
//   type S = Chunk<['a', 'b', 'c', 'd'], 2>; // [['a', 'b'], ['c', 'd']]
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
  0: Reverse<R>;
  // Otherwise, run recursively by inserting the `S` first elements from the input array (`T`)
  // into the accumulator array, and dropping the same number of elements from the beginning
  // of the input array (`T`).
  //
  // Notice that we split the computation into three steps, with conditions that will always be true.
  // This is done to trick the compiler and avoid errors of "Type instantiation is excessively
  // deep..." from the compiler (See more: https://github.com/microsoft/TypeScript/issues/34933).
  //
  // Normally, the computation bellow is the same as `Chunk<Drop<T, S>, S, Drop<T, S>>`.
  1: Unshift<R, Take<T, S>> extends infer G
    ? Drop<T, S> extends infer Z
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
}[T extends [] ? 0 : 1];
