import { Head, Tail, IsEqual, Inc } from '..';

// Gets the index at which the first occurrence of value is found in an array. Returns
// the index of the matched value, else -1: https://lodash.com/docs/4.17.15#indexOf.
//
type S = IndexOf<[1, 2, 3], 2>; // 1
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type IndexOf<
  // The array to inspect.
  T extends Array<any>,
  // The value to search for.
  E,
  // An internal counter that starts with 0 and increases every time the recursion runs. It's
  // eventually returned when the recursion terminates.
  R extends number = 0
> = {
  // Start by checking if `T` is empty. If it is, it means that we didn't find our `E`
  // value anywhere and we return -1.
  'not-found': -1;
  // Otherwise, if the first element of `T` equals our value of `E`, return our accumulated
  // index of `R`. It starts with 0 and increases every time the recursion runs.
  found: R;
  // If the array isn't empty and the first element doesn't equal our value, run the recursion
  // again. This time with the rest of the array (everything but the first element)
  // and increase our counter by 1 so it tracks how many elements we searched for.
  next: IndexOf<Tail<T>, E, Inc<R>>;
  // For example, IndexOf<[1, 2, 3], 2> translates into IndexOf<[2, 3], 2, 1>, since the first
  // element of the array doesn't equal the element we want to find. Notice that the internal
  // counter that started at 0 now index to 1 (the 3rd argument).
  //
  // Finally, IndexOf<[2, 3], 2, 1> is being evaluated, since the first element (2) is the same
  // as the element we want to find, the recursion returns the counter which tracks the
  // position of the first element we were looking for. This results with the value of 1.
}[T extends []
  ? 'not-found'
  : IsEqual<Head<T>, E> extends true
  ? 'found'
  : 'next'];
