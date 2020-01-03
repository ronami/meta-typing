// Increases a number's value by 1. For example: Inc<3> should
// return 4.
//
// I had to implement this as a truth table Since TypeScript's
// type system has no support for arithmetic. Because of that,
// it will return `never` for values bigger than 10 or smaller
// than 0.
//
// See https://en.wikipedia.org/wiki/Truth_table.
export type Inc<T extends number> = T extends 0
  ? 1
  : T extends 1
  ? 2
  : T extends 2
  ? 3
  : T extends 3
  ? 4
  : T extends 4
  ? 5
  : T extends 5
  ? 6
  : T extends 6
  ? 7
  : T extends 7
  ? 8
  : T extends 8
  ? 9
  : T extends 9
  ? 10
  : never;

// Decreases a number's value by 1. For example: Inc<3> should
// return 2.
//
// I had to implement this as a truth table Since TypeScript's
// type system has no support for arithmetic. Because of that,
// it will return `never` for values bigger than 10 or smaller
// than -2.
//
// See https://en.wikipedia.org/wiki/Truth_table.
export type Dec<T extends number> = T extends 10
  ? 9
  : T extends 9
  ? 8
  : T extends 8
  ? 7
  : T extends 7
  ? 6
  : T extends 6
  ? 5
  : T extends 5
  ? 4
  : T extends 4
  ? 3
  : T extends 3
  ? 2
  : T extends 2
  ? 1
  : T extends 1
  ? 0
  : T extends 0
  ? -1
  : T extends -1
  ? -2
  : never;
