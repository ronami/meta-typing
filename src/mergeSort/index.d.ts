import { Head, Lte, Tail, Unshift, Cast, Take, Divide, Size, Drop } from '..';

//
export type MergeSort<T extends Array<any>> = {
  //
  0: [];
  //
  1: T;
  //
  2: FirstGroup<T> extends infer B
    ? MergeSort<Cast<B, Array<any>>> extends infer G
      ? LastGroup<T> extends infer N
        ? MergeSort<Cast<N, Array<any>>> extends infer H
          ? Merge<Cast<G, Array<any>>, Cast<H, Array<any>>>
          : never
        : never
      : never
    : never;
}[T extends [] ? 0 : T extends [any] ? 1 : 2];

//
type FirstGroup<T extends Array<any>> = Take<T, Divide<Size<T>, 2>>;

//
type LastGroup<T extends Array<any>> = Drop<T, Divide<Size<T>, 2>>;

//
type Merge<
  //
  A extends Array<any>,
  //
  B extends Array<any>,
  //
  firstA extends number = Head<A>,
  //
  firstB extends number = Head<B>
> = {
  //
  0: B;
  //
  1: A;
  //
  2: {
    0: Merge<Tail<A>, B> extends infer G
      ? Unshift<Cast<G, Array<any>>, firstA>
      : never;
    1: Merge<Tail<B>, A> extends infer G
      ? Unshift<Cast<G, Array<any>>, firstB>
      : never;
  }[Lte<firstA, firstB> extends true ? 0 : 1];
}[A extends [] ? 0 : B extends [] ? 1 : 2];
