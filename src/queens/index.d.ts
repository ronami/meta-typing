import {
  Head,
  Concat,
  Tail,
  IsEqual,
  Unshift,
  Reverse,
  Cast,
  Add,
  Substract,
  Inc,
  Not,
  And,
} from '..';

// The type representing a board.
type Board = Array<number>;

// Helper function, the opposite of IsEqual.
type IsNotEqual<A, B> = Not<IsEqual<A, B>>;

//
export type nQueens<
  //
  N extends number,
  //
  B extends Array<Board> = [[]],
  //
  C extends number = 0
> = {
  //
  0: B;
  //
  1: Step<N, B> extends infer G
    ? nQueens<N, Cast<G, Array<any>>, Inc<C>>
    : never;
}[IsEqual<N, C> extends true ? 0 : 1];

//
type Step<
  //
  N extends number,
  //
  B extends Array<Board>,
  //
  R extends Array<any> = []
> = {
  //
  0: R;
  //
  1: Develop<N, Head<B>> extends infer G
    ? Concat<R, Cast<G, Array<any>>> extends infer H
      ? Step<N, Tail<B>, Cast<H, Array<any>>>
      : never
    : never;
}[B extends [] ? 0 : 1];

//
type Develop<
  //
  N extends number,
  //
  T extends Board,
  //
  X extends number = 1,
  //
  R extends Array<Board> = []
> = {
  //
  0: Reverse<R>;
  //
  1: Develop<N, T, Inc<X>, Unshift<R, Unshift<T, X>>>;
  //
  2: Develop<N, T, Inc<X>, R>;
}[X extends Inc<N> ? 0 : IsSafe<X, T> extends true ? 1 : 2];

//
type IsSafe<
  //
  X extends number,
  //
  T extends Board,
  //
  N extends number = 1,
  //
  C extends number = T[0]
> = {
  //
  0: true;
  //
  1: IsNotEqual<X, C> extends infer A
    ? IsNotEqual<X, Add<C, N>> extends infer B
      ? IsNotEqual<X, Substract<C, N>> extends infer C
        ? IsSafe<X, Tail<T>, Inc<N>> extends infer D
          ? And<Cast<[A, B, C, D], Array<boolean>>>
          : never
        : never
      : never
    : never;
}[T extends [] ? 0 : 1];
