import {
  Head,
  Reverse,
  Lte,
  Tail,
  Unshift,
  Gte,
  IsEqual,
  Cast,
  Concat,
} from '..';

//
export type QuickSort<
  //
  T extends Array<number>,
  //
  X extends number = Head<T>,
  //
  Z extends Array<number> = Tail<T>
> = {
  //
  0: [];
  //
  1: SmallerHalf<X, Z> extends infer Qs
    ? QuickSort<Cast<Qs, Array<number>>> extends infer S
      ? BiggerHalf<X, Z> extends infer Qb
        ? QuickSort<Cast<Qb, Array<number>>> extends infer B
          ? Unshift<Cast<B, Array<number>>, X> extends infer G
            ? Concat<Cast<S, Array<number>>, Cast<G, Array<number>>>
            : never
          : never
        : never
      : never
    : never;
}[T extends [] ? 0 : 1];

//
type SmallerHalf<
  //
  E extends number,
  //
  T extends Array<number>,
  //
  R extends Array<number> = []
> = {
  //
  0: Reverse<R>;
  //
  1: SmallerHalf<E, Tail<T>, Unshift<R, Head<T>>>;
  //
  2: SmallerHalf<E, Tail<T>, R>;
}[T extends [] ? 0 : Lte<Head<T>, E> extends true ? 1 : 2];

//
type BiggerHalf<
  //
  E extends number,
  //
  T extends Array<number>,
  //
  R extends Array<number> = []
> = {
  //
  0: Reverse<R>;
  //
  1: BiggerHalf<E, Tail<T>, Unshift<R, Head<T>>>;
  //
  2: BiggerHalf<E, Tail<T>, R>;
}[T extends []
  ? 0
  : IsEqual<Head<T>, E> extends true
  ? 2
  : Gte<Head<T>, E> extends true
  ? 1
  : 2];
