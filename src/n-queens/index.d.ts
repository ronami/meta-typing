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
} from '..';

// The type representing a board.
type Board = Array<number>;

// Place N chess queens on an N×N chessboard so that no two queens threaten each other:
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/n-queens.
export type nQueens<
  // The size of the board and the number of queens to place.
  N extends number,
  // An array to hold all possible boards (solutions). Starts with an empty board ([]).
  B extends Array<Board> = [[]],
  // A counter from 0 to `N` that ends the recursion.
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
  1: IsEqual<X, C> extends false
    ? IsEqual<X, Add<C, N>> extends false
      ? IsEqual<X, Substract<C, N>> extends false
        ? IsSafe<X, Tail<T>, Inc<N>> extends true
          ? true
          : false
        : false
      : false
    : false;
}[T extends [] ? 0 : 1];
