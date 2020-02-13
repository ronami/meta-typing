// Increases a number's value by 1. For example, Inc<3> should return 4.
//
// This function is implemented as a truth table Since TypeScript's type system has no
// support for arithmetic. Because of that, it will return `never` for values bigger
// than 10 or smaller than 0.
//
type S1 = Inc<3>; // 4
//
// See https://en.wikipedia.org/wiki/Truth_table.
export type Inc<T extends number> =
  // Check `T`'s value on every number from 0 to 9 and return the next value each time.
  // If it's out of scope, just return `never`.
  T extends keyof IncTable ? IncTable[T] : never;

type IncTable = { 0: 1; 1: 2; 2: 3; 3: 4; 4: 5; 5: 6; 6: 7; 7: 8; 8: 9; 9: 10 };

// Decreases a number's value by 1. For example, Dec<3> should return 2.
//
// This function is implemented as a truth table Since TypeScript's type system has no
// support for arithmetic. Because of that, it will return `never` for values bigger
// than 10 or smaller than 0.
//
type S2 = Dec<3>; // 2
//
// See https://en.wikipedia.org/wiki/Truth_table.
export type Dec<T extends number> =
  // Check `T`'s value on every number from 10 to 1 and return the previous value each time.
  // If it's out of scope, just return `never`.
  T extends keyof DecTable ? DecTable[T] : never;

type DecTable = { 10: 9; 9: 8; 8: 7; 7: 6; 6: 5; 5: 4; 4: 3; 3: 2; 2: 1; 1: 0 };
