// Compares between two values to determine if they are equivalent:
// https://lodash.com/docs/4.17.15#isEqual.
//
//   type S = IsEqual<{ 'a': 1 }, { 'a': 1 }>; // true
//
// For a change this isn't recursive. If `A` and `B` both extend each other, we treat them
// as equal:
export type IsEqual<A, B> =
  // Return `true` only if both extend each other:
  A extends B ? (B extends A ? true : false) : false;
