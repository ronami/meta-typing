// Gets all but the first element of an array: https://lodash.com/docs/4.17.15#tail.
//
type S = Tail<[1, 2, 3]>; // [2, 3]
//
export type Tail<T extends Array<any>> =
  // This is a bit tricky: We define a function that gets an array of values which we assign
  // the type of `T` (as `T` is already of type Array<any>).
  //
  // We then check if that function extends another function of a similar type, which should
  // always return true. The second function takes one argument which we don't care about and
  // and array of other values.
  //
  // We use the newly introduced `infer` keyword to match whatever type the array of `...rest`
  // will be and assign its type to `R`.
  //
  // Since this check always returns true, we return the `infer`d type of `R` which is every
  // value of the array but the first.
  ((...t: T) => void) extends (h: any, ...rest: infer R) => void ? R : never;
