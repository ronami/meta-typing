import { Head, Tail, Dec } from '..';

// Gets the element at index n of array: https://lodash.com/docs/4.17.15#nth.
export type Nth<
  // The array to query.
  T extends Array<any>,
  // The index of the element to return.
  R extends number = 0
> = {
  // If the input array is empty, end the recursion and return `undefined`
  // as it means we couldn't find an element at `R` position:
  0: undefined;
  // Otherwise, if `R` is 0, then it means the next element in the array
  // is the one we're looking for. Return it:
  1: Head<T>;
  // If `R` isn't 0 and there are still more elements in the array, run the
  // recursion again on the rest of the array and decrease `R`'s value by 1:
  2: Nth<Tail<T>, Dec<R>>;
}[T extends [] ? 0 : R extends 0 ? 1 : 2];
