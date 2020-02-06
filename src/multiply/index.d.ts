import { Add, Dec, Cast } from '..';

// Multiply two numbers: https://lodash.com/docs/4.17.15#multiply.
//
//   type S = Multiply<2, 3>; // 6
//
// This type uses recursive type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Multiply<
  // The first number in a multiplication.
  A extends number,
  // The second number in a multiplication.
  B extends number
> = {
  // If any of the numbers is 0, return 0:
  zero: 0;
  // Next, check if any of them are equal to 1 and return the other number:
  'one-b': A;
  'one-a': B;
  // If they're both not 1s or 0s, we call the recursion again, like this:
  //
  //   Add<A, Multiply<A, Dec<B>>>
  //
  // We add the value of the first number (A) to the result of calling Multiply
  // again in which we decrease B's value by 1. This means that we call Add<A, A>
  // B times.
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Multiply<A, Dec<B>> extends infer G // Assign result to `G`
    ? Add<A, Cast<G, number>>
    : never;
}[A extends 0
  ? 'zero'
  : B extends 0
  ? 'zero'
  : B extends 1
  ? 'one-b'
  : A extends 1
  ? 'one-a'
  : 'next'];
