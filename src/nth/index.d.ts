// Gets the element at index n of array: https://lodash.com/docs/4.17.15#nth.
//
//   type S = Nth<[1, 2, 3], 1>; // 2
//
export type Nth<
  // The array to query.
  T extends Array<any>,
  // The index of the element to return.
  N extends number = 0
> =
  // Pretty straight-forward: We check if `R` is a key that exists on `T`. If it is,
  // we return its value. Otherwise, it's `undefined` that we return:
  N extends keyof T ? T[N] : undefined;
