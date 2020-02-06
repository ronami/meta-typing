import { Add, Tail, Head, Cast } from '..';

// Computes the sum of the values in array: https://lodash.com/docs/4.17.15#sum.
//
//   type S = Sum<[1, 2, 3]>; // 6
//
// This type uses recursive type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Sum<
  // The array to iterate over.
  A extends Array<number>,
  // A value to accumulate the results, starts at 0.
  R extends number = 0
> = {
  // Start by checking if the array is empty. If it is then we reached the end of the
  // recursion and we return the accumulated result:
  finish: R;
  // Otherwise, we run the recursion again with the rest of the array, and add the first
  // element of the array to our accumulated result (R).
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Add<R, Head<A>> extends infer G // Assign result to `G`
    ? Sum<Tail<A>, Cast<G, number>>
    : never;
}[A extends [] ? 'finish' : 'next'];
