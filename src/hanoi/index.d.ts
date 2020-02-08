import { Dec, Concat, Unshift, Cast } from '..';

// A mathematical game or puzzle that consists of three rods and a number of disks of different sizes:
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/hanoi-tower.
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Hanoi<
  // The number of discs to use.
  N extends number,
  // The first rod.
  A = 'a',
  // The second rod.
  B = 'b',
  // The third rod.
  C = 'c'
> = {
  //
  finish: [];
  //
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Hanoi<Dec<N>, C, B, A> extends infer H // Assign result to `H`
    ? Unshift<Cast<H, Array<any>>, [A, B]> extends infer G // Assign result to `G`
      ? Hanoi<Dec<N>, A, C, B> extends infer F // Assign result to `F`
        ? Concat<Cast<F, Array<any>>, Cast<G, Array<any>>>
        : never
      : never
    : never;
}[N extends 0 ? 'finish' : 'next'];
