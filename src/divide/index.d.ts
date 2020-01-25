import { Subtract, Dec, Inc, Cast, IsNever } from '..';

// Divide two numbers: https://lodash.com/docs/4.17.15#divide.
//
//   type S = Divide<6, 2>; // 3
//
// This version is only going to work for computation that result with whole numbers. If
// a division results in a fraction the result will be rounded down. For example, Divide<5, 2>
// will result with 2.
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
export type Divide<
  // The first number in a division.
  A extends number,
  // The second number in a division.
  B extends number,
  // An accumulator to collect the result.
  R extends number = 0
> = {
  // Start by checking if `A` is of type `never`. If that's the case then `A` was reduced to a number
  // bellow 0 and the result is probably a fraction. Return the accumulator minus 1 (since we went a
  // bit too far into the negative):
  fraction: Dec<R>;
  // Next, check if the value of `A` is 0. If it is, then we reached the end of the recursion (no
  // fraction). Return the `R` as the result:
  finish: R;
  // Then, check if the divisor is 0 and return `never` as a way to signal that we can't divide by 0:
  'unable-to-divide': never;
  // Otherwise, run the recursion again by subtracting `B`'s value from `A` and increasing `R`'s value by
  // 1.
  //
  // Notice that we split the computation into two steps with a condition that will always be true.
  // This is done to trick the compiler and avoid errors of "Type instantiation is excessively
  // deep..." from the compiler (See more: https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17).
  next: Subtract<A, B> extends infer G // Assign result to `G`
    ? Divide<Cast<G, number>, B, Inc<R>>
    : never;
  // For example, the calculation of Subtract<6, 2> will first translate into Subtract<4, 2, 1>. `A`'s
  // value was reduced by 2 (`B`'s value) and the accumulator was increased by 1.
  //
  // Then, since `A`'s value isn't 0 or `never`, we run again with: Subtract<2, 2, 2>. Again, `A`'s
  // value was reduced by `B`'s value and the accumulator was increased by 1 yet again.
  //
  // Next, the calculation translates into Subtract<0, 2, 3>. `A`'s value was reduced again and the
  // accumulator has increased by 1 again.
  //
  // Finally, since now `A`'s value equals 0, the recursion terminates and returns the accumulator's
  // value as the result: 3.
}[IsNever<A> extends true
  ? 'fraction'
  : A extends 0
  ? 'finish'
  : B extends 0
  ? 'unable-to-divide'
  : 'next'];
