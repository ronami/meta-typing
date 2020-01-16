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

// Sorts an array of number in a descending order with quick-sort algorithm.
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/quick-sort.
//
// type S = QuickSort<[6, 9, 7, 1, 0, 4, 3]>; // [0, 1, 3, 4, 6, 7, 9]
//
// Notice that the function is implemented with an object and a ternary check that accesses
// one of it's properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is essentially the same as writting: `T extends H ? A : B`. If this type is using
// recursion, using the latter approach quickly results with type errors of infinite recursion
// so the first option is used to avoid false compiler errors.
export type QuickSort<
  // The input array.
  T extends Array<number>,
  // A local variable for the first element in `T`.
  X extends number = Head<T>,
  // A local variable for the tail for `T`.
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
