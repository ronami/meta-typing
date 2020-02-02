import { Tail, Head, Lte, Unshift, Cast } from '..';

//
type Insert<
  //
  N extends number,
  //
  T extends Array<number>
> = {
  //
  0: [N];
  1: Unshift<T, N>;
  2: Insert<N, Tail<T>> extends infer G
    ? Unshift<Cast<G, Array<any>>, Head<T>>
    : never;
  //
}[T extends [] ? 0 : Lte<N, Head<T>> extends true ? 1 : 2];

//
type InsertionSort<
  //
  T extends Array<number>,
  //
  R extends Array<number> = []
> = {
  //
  0: R;
  //
  1: Insert<Head<T>, R> extends infer G
    ? InsertionSort<Tail<T>, Cast<G, Array<any>>>
    : never;
  //
}[T extends [] ? 0 : 1];
