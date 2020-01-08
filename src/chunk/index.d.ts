import { Reverse, Unshift, Take, Cast, Drop } from '..';

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
