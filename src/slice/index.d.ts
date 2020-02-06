import { Tail, Head, Unshift, Reverse, Dec } from '..';

// Creates a slice of an array from start up to, but not including, end:
// https://lodash.com/docs/4.17.15#slice.
//
//   type S = Slice<[1, 2, 3, 4, 5, 6], 2, 3>; // [3, 4, 5]
//
// This type uses recursive type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Slice<
  // The array to slice.
  T extends Array<any>,
  // The start position.
  S extends number,
  // The end position.
  E extends number,
  // An internal array to accumulate the result.
  R extends Array<any> = []
> = {
  // We start by checking if the input array is empty. If it is, we reached the end
  // of the recursion and we return the results we accumulated so far.
  // We reverse it first since we keep inserting elements to it from the beggining (using
  // Unshift):
  finish: Reverse<R>;
  // Next up, we check if the start number is 0. If it's not, we run the recursion again
  // on the rest of the array and decrease its value by 1 and wait until it gets to 1:
  skip: Slice<Tail<T>, Dec<S>, E>;
  // If the start position is 0, we check if the end position is 0 too. If it is, then we've
  // finished with the recursion and return the reversed accumulated result (R). Otherwise,
  // we run the recursion again on the rest of the array, with the same start position (0),
  // decrease the end position by 1, and also push the current element into our accumulator:
  insert: Slice<Tail<T>, S, Dec<E>, Unshift<R, Head<T>>>;
  // For example, calling Slice<[1, 2, 3, 4], 1, 2> will first translate into:
  // Slice<[2, 3, 4], 0, 2, []>. Notice that the first element was dropped because the start
  // position wasn't 0 yet, and the recursion runs again on the reset of the array.
  //
  // Next, the recursion will look like this: Slice<[3, 4], 0, 1, [2]>. Notice that now, with
  // the start position being 0, the first element of the array (2) was inserted into the
  // accumulator, and the value of the end position was reduced by 1. The recursion then runs
  // on the rest of the array.
  //
  // Then, it will look like this: Slice<[4], 0, 0, [3, 2]>. Again, since start position is 0
  // and the end position isn't 0, the first element (3) is inserted into the accumulator
  // and the recursion runs on the rest of the array and decreases the end position by 1.
  //
  // Finally, now that both the start and end positions are 0, the reversed accumulator is
  // returned which results with: [2, 3].
}[T extends []
  ? 'finish'
  : S extends 0
  ? E extends 0
    ? 'finish'
    : 'insert'
  : 'skip'];
