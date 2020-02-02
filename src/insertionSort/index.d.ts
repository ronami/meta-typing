import { Tail, Head, Lte, Unshift, Cast } from '..';

// Sorts an array of number in a descending order with insertion-sort algorithm.
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/insertion-sort.
//
// type S = InsertionSort<[6, 9, 7, 1, 0, 4, 3]>; // [0, 1, 3, 4, 6, 7, 9]
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
type InsertionSort<
  // The input array.
  T extends Array<number>,
  // An accumulator to collect the results.
  R extends Array<number> = []
> = {
  // Once the array is empty, return the accumulator.
  finish: R;
  // Otherwise, insert the first element into its correct in the already sorted accumulator (R)
  // and call the recursion again with the rest of the input array (all but the first element).
  //
  // Notice that we split the computation into two steps with a condition that will always be true.
  // This is done to trick the compiler and avoid errors of "Type instantiation is excessively
  // deep..." from the compiler (See more: https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17).
  next: Insert<Head<T>, R> extends infer G
    ? InsertionSort<Tail<T>, Cast<G, Array<any>>>
    : never;
}[T extends [] ? 'finish' : 'next'];

// Helper function to insert a number into an already sorted array.
type Insert<
  // The number to insert.
  N extends number,
  // The sorted array to insert the number into.
  R extends Array<number>
> = {
  // If the input array is empty then there's nothing to sort, return `N` as the single element.
  finish: [N];
  // Then, check if `N` is less than or equal to the first element of the array. If it is then
  // it's easy, simply insert it to the beginning of the input array.
  'less-than': Unshift<R, N>;
  // Otherwise, run the recursion again on the rest of the array (all but the first element) and
  // insert the first element into the sorted array (R).
  //
  // Notice that we split the computation into two steps with a condition that will always be true.
  // This is done to trick the compiler and avoid errors of "Type instantiation is excessively
  // deep..." from the compiler (See more: https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17).
  'greater-than': Insert<N, Tail<R>> extends infer G
    ? Unshift<Cast<G, Array<any>>, Head<R>>
    : never;
}[R extends []
  ? 'finish'
  : Lte<N, Head<R>> extends true
  ? 'less-than'
  : 'greater-than'];
