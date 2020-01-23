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
  // A local variable for the first element in `T` (The pivot).
  X extends number = Head<T>,
  // A local variable for the tail for `T`.
  Z extends Array<number> = Tail<T>
> = {
  // Start by checking if the input is empty. If it is, return it. A sorted empty list
  // is an empty list.
  finish: [];
  // Take the first element as the pivot and split the rest of the list into two sub lists:
  // The elements that are greater than the pivot and those that are smaller than the pivot.
  //
  // Then, recursively sort each of these sub lists and finally concatenate them with the
  // pivot in the middle.
  //
  // Notice that we split the computation into multiple steps with a condition that will always be true.
  // This is done to trick the compiler and avoid errors of "Type instantiation is excessively
  // deep..." from the compiler (See more: https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17).
  next: SmallerPart<X, Z> extends infer Qs // Assign result to `Qs`
    ? QuickSort<Cast<Qs, Array<number>>> extends infer S // Assign result to `S`
      ? BiggerPart<X, Z> extends infer Qb // Assign result to `Qb`
        ? QuickSort<Cast<Qb, Array<number>>> extends infer B // Assign result to `B`
          ? Unshift<Cast<B, Array<number>>, X> extends infer G // Assign result to `G`
            ? Concat<Cast<S, Array<number>>, Cast<G, Array<number>>>
            : never
          : never
        : never
      : never
    : never;
  //
}[T extends [] ? 'finish' : 'next'];

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
  finish: Reverse<R>;
  // Then, check if the first element of the array is less than or equal to `E`. If it
  // is, insert it into the beginning of the accumulator and run the recursion again
  // on the rest of the array.
  insert: SmallerPart<E, Tail<T>, Unshift<R, Head<T>>>;
  // Otherwise, skip this element and run the recursion again on the rest of the array.
  skip: SmallerPart<E, Tail<T>, R>;
}[T extends [] ? 'finish' : Lte<Head<T>, E> extends true ? 'insert' : 'skip'];

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
  finish: Reverse<R>;
  // Then, check if the first element of the array is greater than `E`. If it is, insert
  // it into the beginning of the accumulator and run the recursion again on the rest of
  // the array.
  insert: BiggerPart<E, Tail<T>, Unshift<R, Head<T>>>;
  // Otherwise, skip this element and run the recursion again on the rest of the array.
  skip: BiggerPart<E, Tail<T>, R>;
}[T extends []
  ? 'finish'
  : IsEqual<Head<T>, E> extends true
  ? 'skip'
  : Gte<Head<T>, E> extends true
  ? 'insert'
  : 'skip'];
