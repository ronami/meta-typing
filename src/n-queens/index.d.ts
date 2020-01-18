import {
  Head,
  Concat,
  Tail,
  IsEqual,
  Unshift,
  Cast,
  Add,
  Substract,
  Inc,
} from '..';

// The type to represent a board with queens placed on it.
//
// For example, the array [2, 4, 1, 3] represents a board (read from right to left) in which a queen
// is placed in the first row on column 3, on the second row in column 1, on the third row in column
// 4 and finally another queen in the 4th row on column 2:
//    _______
// 1 |_|_|#|_|
// 2 |#|_|_|_|
// 3 |_|_|_|#|
// 4 |_|#|_|_|
//    1 2 3 4
//
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
  // The size of the board and the number of queens to place.
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

// Takes an existing board and returns an array of all possible boards that can be developed from it by
// placing a queen in the next row.
//
// For example, the board [3] represents a board with only one queen (placed in the first row on
// the 3rd column):
//    _______
// 1 |_|_|#|_|
// 2 |_|_|_|_|
// 3 |_|_|_|_|
// 4 |_|_|_|_|
//    1 2 3 4
//
// For this board, we can place a queen safely in row 2 in the 1st column:
//    _______
// 1 |_|_|#|_|
// 2 |#|_|_|_|
// 3 |_|_|_|_|
// 4 |_|_|_|_|
//    1 2 3 4
//
// We can't put a queen anywhere else on row 2 because it will be threatened by our first queen
// on row 1. For this board ([3]), `Develop` will return just one board that's safe to continue with:
// [[1, 3]].
type Develop<
  // The size of the board and the number of queens to place.
  N extends number,
  // An existing board to develop. Returns all the possible boards from placing a queen on the next
  // row safely.
  T extends Board,
  // Internal counter that starts at 1 and ends at N. Every time the recursion runs one of the
  // columns on the next row are checked. This counter helps track which column is being checked now.
  X extends number = 1,
  // An accumulator to collect all safe possible board placements.
  R extends Array<Board> = []
> = {
  //
  0: R;
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
