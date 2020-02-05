import { Dec, Concat, Unshift, Cast } from '..';

// A mathematical game or puzzle that consists of three rods and a number of disks of different sizes:
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/hanoi-tower.
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
  // Notice that we split the computation into three steps, with conditions that will always be true.
  // This is done to trick the compiler and avoid errors of "Type instantiation is excessively
  // deep..." from the compiler (See more: https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17).
  next: Hanoi<Dec<N>, C, B, A> extends infer H
    ? Unshift<Cast<H, Array<any>>, [A, B]> extends infer G
      ? Hanoi<Dec<N>, A, C, B> extends infer F
        ? Concat<Cast<F, Array<any>>, Cast<G, Array<any>>>
        : never
      : never
    : never;
}[N extends 0 ? 'finish' : 'next'];
