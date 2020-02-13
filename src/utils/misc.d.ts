// https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379092421
export type IsNever<T> = [T] extends [never] ? true : false;

// Check if `A` extends `B`. If that's the case, just return `A`. Otherwise, `B`
// is returned.
//
type S1 = Cast<5, number>; // 5
type S2 = Cast<'5', number>; // number
type S3 = Cast<'hello', boolean>; // boolean
//
// This is useful when the compiler doesn't know that a type passes some generic constraint
// (see https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints).
//
// We can cast that type to match a more general type. As far as the compiler is concerned,
// the type either extends the more general type, or that it gets the more general type.
export type Cast<A, B> = A extends B ? A : B;
