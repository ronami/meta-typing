import { Pull } from '..';

// Creates an array with all falsey values removed. The values false, null, 0,
// "", and undefined are falsey: https://lodash.com/docs/4.17.15#compact.
//
//   type S = Compact<[0, 1, false, 2, '', 3]>; // [1, 2, 3]
//
export type Compact<
  // The input array.
  T extends Array<any>
> =
  // Pull removes all given values from an array. Compact is a more specific form of
  // pull that removes falsey values from an array while pull allows us to remove any
  // list of values.
  //
  // We use it here to filter falsy values from an array:
  Pull<T, [0, null, undefined, false, '']>;
