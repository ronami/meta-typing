import { Subtract, Gte, Cast } from '..';

// Return the remainder (%) when one number is diveded by a second number
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder
//
type S = Remainder<5, 3>; // 2
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Remainder<
  // The dividend
  A extends number,
  // The divisor
  B extends number
> = {
  // If `B` is `0` return never
  'division-by-zero': never;
  // If `A` is less than `B` return `A`
  finish: A;
  // If A is greater than or equal to `B` it means we need to call the recursion again
  // but only after we've substructed `B` from `A`
  //
  //   Remainder<Subtract<A, B>, B>
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Subtract<A, B> extends infer R ? Remainder<Cast<R, number>, B> : never;
}[B extends 0
  ? 'division-by-zero'
  : Gte<A, B> extends true
  ? 'next'
  : 'finish'];
