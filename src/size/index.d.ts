// Gets the size of an array: https://lodash.com/docs/4.17.15#size.
//
type S = Size<[1, 2, 3]>; // 3
//
export type Size<
  // The array to inspect.
  T extends Array<any>
  // Pretty straight-forward, since we know it's an array, it has a length property:
> = T['length'];
