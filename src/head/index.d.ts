// Gets the first element of array: https://lodash.com/docs/4.17.15#head.
//
//
export type Head<T extends Array<any>> = T extends [any, ...Array<any>]
  ? T['0']
  : never;
