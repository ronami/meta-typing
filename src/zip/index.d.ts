import { Reverse, Unshift, Tail, Head, Cast, IsNever } from '..';

// Creates an array of grouped elements, the first of which contains the first elements
// of the given arrays, the second of which contains the second elements of the given
// arrays, and so on: https://lodash.com/docs/4.17.15#zip.
//
//   type S = Zip<[['a', 'b'], [1, 2], [true, false]]>; // [['a', 1, true], ['b', 2, false]]
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Zip<T extends Array<Array<any>>, R extends Array<any> = []> = {
  finish: Reverse<R>;
  next: AllTails<T> extends infer G
    ? Zip<Cast<G, Array<any>>, Unshift<R, AllHeads<T>>>
    : never;
}[T extends [] ? 'finish' : T extends [[], ...Array<any>] ? 'finish' : 'next'];

type Default<V, D> = IsNever<V> extends true ? D : V;

type AllHeads<T extends Array<Array<any>>, R extends Array<any> = []> = {
  finish: Reverse<R>;
  next: AllHeads<Tail<T>, Unshift<R, Default<Head<Head<T>>, undefined>>>;
}[T extends [] ? 'finish' : 'next'];

type AllTails<T extends Array<Array<any>>, R extends Array<any> = []> = {
  finish: Reverse<R>;
  next: AllTails<Tail<T>, Unshift<R, Tail<Head<T>>>>;
}[T extends [] ? 'finish' : 'next'];
