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
export type QuickSort<
  // The input array.
  T extends Array<number>,
  // A local variable for the first element in `T`.
  X extends number = Head<T>,
  // A local variable for the tail for `T`.
  Z extends Array<number> = Tail<T>
> = {
  // Start by checking if the input is empty. If it is, return it. A sorted empty list
  // is an empty list.
  0: [];
  //
  1: SmallerPart<X, Z> extends infer Qs
    ? QuickSort<Cast<Qs, Array<number>>> extends infer S
      ? BiggerPart<X, Z> extends infer Qb
        ? QuickSort<Cast<Qb, Array<number>>> extends infer B
          ? Unshift<Cast<B, Array<number>>, X> extends infer G
            ? Concat<Cast<S, Array<number>>, Cast<G, Array<number>>>
            : never
          : never
        : never
      : never
    : never;
  //
}[T extends [] ? 0 : 1];

// Returns an array with all the values that are smaller than or equal the pivot (`E`).
type SmallerPart<
  // The pivot element.
  E extends number,
  // The array to compare its elements against the pivot.
  T extends Array<number>,
  // An accumulator to collect the results.
  R extends Array<number> = []
> = {
  // If the input array is empty, return the accumulator array. We reverse it first
  // since we add elements into it in a reversed order.
  0: Reverse<R>;
  // Then, check if the first element of the array is less than or equal to `E`. If it
  // is, insert it into the beginning of the accumulator and run the recursion again
  // on the rest of the array.
  1: SmallerPart<E, Tail<T>, Unshift<R, Head<T>>>;
  // Otherwise, skip this element and run the recursion again on the rest of the array.
  2: SmallerPart<E, Tail<T>, R>;
}[T extends [] ? 0 : Lte<Head<T>, E> extends true ? 1 : 2];

// Returns an array with all the values that are bigger than the pivot (`E`).
type BiggerPart<
  // The pivot element.
  E extends number,
  // The array to compare its elements against the pivot.
  T extends Array<number>,
  // An accumulator to collect the results.
  R extends Array<number> = []
> = {
  // If the input array is empty, return the accumulator array. We reverse it first
  // since we add elements into it in a reversed order.
  0: Reverse<R>;
  // Then, check if the first element of the array is greater than `E`. If it is, insert
  // it into the beginning of the accumulator and run the recursion again on the rest of
  // the array.
  1: BiggerPart<E, Tail<T>, Unshift<R, Head<T>>>;
  // Otherwise, skip this element and run the recursion again on the rest of the array.
  2: BiggerPart<E, Tail<T>, R>;
}[T extends []
  ? 0
  : IsEqual<Head<T>, E> extends true
  ? 2
  : Gte<Head<T>, E> extends true
  ? 1
  : 2];
