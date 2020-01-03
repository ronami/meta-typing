import { Inc, Dec } from '..';

// Adds two numbers: https://lodash.com/docs/4.17.15#add.
//
// Because TypeScript's type system has no support for arithmetic,
// the implementation uses recursion.
export type Add<A extends number, B extends number> = {
  0: A;
  1: Add<Inc<A>, Dec<B>>;
}[B extends 0 ? 0 : 1];
