// https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379092421
export type IsNever<T> = [T] extends [never] ? true : false;

//
export type Cast<A, B> = A extends B ? A : B;
