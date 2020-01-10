// Gets the first element of array: https://lodash.com/docs/4.17.15#head.
//
//   type S = Head<[1, 2, 3]>; // 1
//
// If `T` is of type array and has at least one element, return it. Otherwise,
// return `never`:
export type Head<T extends Array<any>> =
  // We specifically check if it extends an array with at least one item:
  T extends [any, ...Array<any>] ? T['0'] : never;
