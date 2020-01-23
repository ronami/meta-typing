// The eight queens puzzle is the problem of placing eight chess queens on an 8×8 chessboard
// so that no two queens threaten each other. Thus, a solution requires that no two queens
// share the same row, column, or diagonal.
//
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/n-queens.

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

// Place N chess queens on an N×N chessboard so that no two queens threaten each other.
//
// Notice that the function is implemented with an object and a ternary check that accesses
// one of its properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is the same as writing: `T extends H ? A : B`. If the condition is true then
// `A` is returned because it's referenced by the `0` key. Otherwise it's `B` that's returned
// since it's referenced by the `1` key.
//
// TypScript's type system doesn't support recursive types and the above example is a way
// of going around it. Please note that it's not something TypeScript officially supports:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type nQueens<
  // The size of the board and the number of queens to place.
  N extends number,
  // An array to hold all possible boards (solutions). Starts with an empty board ([]).
  B extends Array<Board> = [[]],
  // A counter from 0 to `N` that ends the recursion.
  C extends number = 0
  // A recursive function that runs `Step` `N` times. Every time `Queens` runs again it
  // checks that in every board a queen can be placed on the next row.
> = {
  // Since the recursion runs `N` times, if `C` that started at 0 equals `N`, end the
  // recursion.
  finish: B;
  // Otherwise, run `Step` and pass its resulting boards to another recursive call to
  // `Queens`.
  //
  // Notice that we split the computation into two steps with a condition that will always be true.
  // This is done to trick the compiler and avoid errors of "Type instantiation is excessively
  // deep..." from the compiler (See more: https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17).
  next: Step<N, B> extends infer G // Asign result to `G`
    ? nQueens<N, Cast<G, Array<any>>, Inc<C>>
    : never;
}[IsEqual<N, C> extends true ? 'finish' : 'next'];

// Iterate over the array of boards and tries to call `Develop` on every one. `Develop` will try
// to place a queen in the next row in every one of the boards.
type Step<
  // The size of the board and the number of queens to place.
  N extends number,
  // An array to hold all possible boards (solutions).
  B extends Array<Board>,
  // An array to accumulate the results. Eventually it is returned.
  R extends Array<any> = []
> = {
  // If we finished iterating over the array of boards, return the accumulator.
  finish: R;
  // Otherwise, run `Develop` over the first board, concatenate its resulting boards
  // into the accumulator, then run `Step` again for the rest of the boards.
  //
  // Notice that we split the computation into multiple steps with a condition that will always be true.
  // This is done to trick the compiler and avoid errors of "Type instantiation is excessively
  // deep..." from the compiler (See more: https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17).
  next: Develop<N, Head<B>> extends infer G // Assign result to `G`
    ? Concat<R, Cast<G, Array<any>>> extends infer H // Assign result to `H`
      ? Step<N, Tail<B>, Cast<H, Array<any>>>
      : never
    : never;
}[B extends [] ? 'finish' : 'next'];

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
  // An internal counter that starts at 1 and ends at `N`. This counter helps track which column is
  // being checked now.
  X extends number = 1,
  // An accumulator to collect all safe possible board placements.
  R extends Array<Board> = []
> = {
  // If we finished iterating over all `N` columns, return the accumulated results.
  finish: R;
  // Otherwise, check if it's safe to place a queen on column `X` on the next row. If it's safe,
  // run the recursion again and insert the board we checked ([X, ...T]) into the accumulator.
  //
  // Increase the counter by 1 and run the recursion again.
  insert: Develop<N, T, Inc<X>, Unshift<R, Unshift<T, X>>>;
  // If it's not safe, skip `X` and run again by increasing the counter by 1.
  skip: Develop<N, T, Inc<X>, R>;
}[X extends Inc<N> ? 'finish' : IsSafe<X, T> extends true ? 'insert' : 'skip'];

// Checks if it's safe to place a chess queen in column `X` on the board `T` so it's not threatened
// by other queens on the board.
type IsSafe<
  // The column number to check it's safe to place a queen on the board.
  X extends number,
  // The board, possibly with other queens already placed on, to check against.
  T extends Board,
  // An internal counter to track
  N extends number = 1,
  // An internal variable that points to the first queen in the board.
  C extends number = Head<T>
> = {
  //
  finish: true;
  //
  next: IsEqual<X, C> extends false
    ? IsEqual<X, Add<C, N>> extends false
      ? IsEqual<X, Substract<C, N>> extends false
        ? IsSafe<X, Tail<T>, Inc<N>> extends true
          ? true
          : false
        : false
      : false
    : false;
}[T extends [] ? 'finish' : 'next'];
