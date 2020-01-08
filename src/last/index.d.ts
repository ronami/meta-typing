import { Tail, Head } from '..';

// Gets the last element of array: https://lodash.com/docs/4.17.15#last.
export type Last<
  // The array to query.
  A extends Array<any>
> = {
  // If the array is empty then there is no last element and we simply return `undefined`:
  0: undefined;
  // Next, check if the array has only 1 element in it. If that's the case, that element is
  // the last element, simply return it as the result:
  1: Head<A>;
  // Otherwise, then the next element isn't the last and we run the recursion again with the
  // rest of the array:
  2: Last<Tail<A>>;
}[A extends [] ? 0 : A extends [any] ? 1 : 2];
