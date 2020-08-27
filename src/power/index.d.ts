import { Multiply, Dec, Cast } from '..';

// Power two numbers: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
//
type S = Power<2, 3>; // 8
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Power<
  // The Base.
  A extends number,
  // The Exponent used to raise the Base.
  B extends number
  > = {
  // If A is 0: return 0
  // If B is 0: return 1
  zero: 0;
  one: 1;
  // If they're both not 1s or 0s, we call the recursion again, like this:
  //
  //   Multiply<A, Power<A, Dec<B>>>
  //
  // We multiply the value of the first number (A) to the result of calling Multiply
  // again in which we decrease B's value by 1. This means that we call Multiply<A, A>
  // B times.
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Power<A, Dec<B>> extends infer G // Assign result to `G`
    ? Multiply<A, Cast<G, number>>
    : never;
}[B extends 0 ? 'one' : A extends 0 ? 'zero' : A extends 1 ? 'one' : 'next'];
