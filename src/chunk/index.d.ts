import { Reverse, Unshift, Take, Cast, Drop } from '..';

// Creates an array of elements split into groups the length of size. If array can't
// be split evenly, the final chunk will be the remaining elements:
// https://lodash.com/docs/4.17.15#chunk.
//
//   type S = Chunk<['a', 'b', 'c', 'd'], 2>; // [['a', 'b'], ['c', 'd']]
//
export type Chunk<
  T extends Array<any>,
  S extends number = 1,
  R extends Array<Array<any>> = []
> = {
  0: Reverse<R>;
  1: Unshift<R, Take<T, S>> extends infer G
    ? Drop<T, S> extends infer Z
      ? Chunk<Cast<Z, Array<any>>, S, Cast<G, Array<any>>>
      : never
    : never;
}[T extends [] ? 0 : 1];
