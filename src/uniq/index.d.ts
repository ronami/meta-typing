import { Tail, Head, Includes, Unshift, Reverse } from '..';

// Creates a duplicate-free version of an array, in which only the first occurrence
// of each element is kept: https://lodash.com/docs/4.17.15#uniq.
//
type S = Uniq<[2, 1, 2]>; // [2, 1]
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Uniq<
  // The input array.
  T extends Array<any>,
  // An internal array to accumulate the unique elements. When the recursion ends,
  // it will be returned.
  R extends Array<any> = []
> = {
  // If the input array is empty, return the accumulator array. We reverse it first
  // since we add elements into it in a reversed order.
  finish: Reverse<R>;
  // Otherwise, check if the first element of the array is already in the accumulator
  // array. If it is, then there is no need to add it a second time, and we run the
  // recursion again with the rest of the array.
  //
  // If the it isn't in the accumulator array, add it to the beggining of the accumulator
  // array and run the recursion again with the rest of the array:
  next: Includes<R, Head<T>> extends true
    ? Uniq<Tail<T>, R>
    : Uniq<Tail<T>, Unshift<R, Head<T>>>;
  // For example, Uniq<[2, 1, 2]> will first translate into Uniq<[1, 2], [2]>. Notice that
  // the first element was added to the accumulator array. This is because the first element
  // wasn't already in the accumulator. The recursion then runs again on the rest of the array.
  //
  // The next recursion call will look like this: Uniq<[2], [1, 2]>. Again, since the first
  // element (1) wasn't in the accumulator, in was inserted to the beginning of it, and the
  // recursion runs on the rest of the array.
  //
  // Then, the recursion will look like this: Uniq<[], [1, 2]>>. Notice that the first element
  // (2) wasn't added to the accumulator because it already present there.
  //
  // Finally, the array is empty so we return the reversed value of the accumulator to keep
  // the order correct. This results in: [2, 1].
}[T extends [] ? 'finish' : 'next'];
