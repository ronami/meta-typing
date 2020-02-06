import { Head, Lte, Tail, Unshift, Cast, Take, Divide, Size, Drop } from '..';

// Sorts an array of number in a descending order with merge-sort algorithm.
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/merge-sort.
//
// type S = MergeSort<[6, 9, 7, 1, 0, 4, 3]>; // [0, 1, 3, 4, 6, 7, 9]
//
// This type uses recursive type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type MergeSort<
  // The input array.
  T extends Array<any>
> = {
  // Start by checking if the input is empty. If it is, return it. A sorted empty list
  // is an empty list.
  finish: [];
  // Then, since we're going to break the array into chunks that may have one element in them
  // check if `T` is an array with one element. If that's the case, there's no need to sort it.
  single: T;
  // Otherwise, break `T` into two parts (with `FirstHalf` and `SecondHalf`, explained bellow)
  // and run `MergeSort` recursively on both parts.
  //
  // Subsequent recursive calls to `MergeSort` will only return arrays that either have one element
  // or that are empty (see the two previous checks that terminate the recursion). Those arrays are
  // already sorted since they have 1 element at most.
  //
  // Once small groups are returned, they are merged with correct order into larger groups with the
  // `Merge` generic explained bellow. Then, all sub arrays are merged recursively into one large
  // result that is eventually returned.
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: FirstHalf<T> extends infer B // Assign result to `B`
    ? MergeSort<Cast<B, Array<any>>> extends infer G // Assign result to `G`
      ? SecondHalf<T> extends infer N // Assign result to `N`
        ? MergeSort<Cast<N, Array<any>>> extends infer H // Assign result to `H`
          ? Merge<Cast<G, Array<any>>, Cast<H, Array<any>>>
          : never
        : never
      : never
    : never;
}[T extends [] ? 'finish' : T extends [any] ? 'single' : 'next'];

// Splits an array into two parts and returns the first part. For example, FirstHalf<[1, 2, 3, 4]>
// will return [1, 2].
type FirstHalf<T extends Array<any>> =
  // Take the first half of the array.
  Take<T, Divide<Size<T>, 2>>;

// Splits an array into two parts and returns the last part. For example, SecondHalf<[1, 2, 3, 4]>
// will return [3, 4].
type SecondHalf<T extends Array<any>> =
  // Drop the first half of the array and return the rest.
  Drop<T, Divide<Size<T>, 2>>;

// Takes to sorted array and merges them together with correct sorting. For example,
// Merge<[1, 3], [2, 4]> will return [1, 2, 3, 4].
type Merge<
  // The first sorted array to merge.
  A extends Array<any>,
  // The second sorted array to merge.
  B extends Array<any>,
  // An internal variable to hold the first element of `A`.
  firstA extends number = Head<A>,
  // An internal variable to hold the first element of `B`.
  firstB extends number = Head<B>
> = {
  // Start by checking if `A` is an empty array. If that's the case, return `B`.
  'empty-a': B;
  // Next, check if `B` is an empty array and return `A`.
  'empty-b': A;
  // Then, check if the first element of `A` is smaller than or equal to the first element of `B`.
  otherwise: {
    // If it is, run the recursion again for the rest of `A` and insert the first element of `A` into
    // the beginning of the result.
    //
    // Computation is split into multiple steps with `infer`, see more:
    // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
    'less-than': Merge<Tail<A>, B> extends infer G // Assign result to `G`
      ? Unshift<Cast<G, Array<any>>, firstA>
      : never;
    // Otherwise, run the recursion again for the rest of `B` and insert the first element of `B`
    // into the beginning of the result.
    'greater-than': Merge<Tail<B>, A> extends infer G // Assign result to `G`
      ? Unshift<Cast<G, Array<any>>, firstB>
      : never;
  }[Lte<firstA, firstB> extends true ? 'less-than' : 'greater-than'];
}[A extends [] ? 'empty-a' : B extends [] ? 'empty-b' : 'otherwise'];
