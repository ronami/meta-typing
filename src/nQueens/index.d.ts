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
  Subtract,
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
type S1 = nQueens<4>; // [[2, 4, 1, 3], [3, 1, 4, 2]]
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type nQueens<
  // The size of the board and the number of queens to place.
  N extends number,
  // An array to hold all possible boards (solutions). Starts with an empty board ([]).
  B extends Array<Board> = [[]],
  // A counter from that tracks the times the recursion has run.
  C extends number = 0
  // Every time it runs, the recursion tries to place a queen in the next row of each board
  // (solution). After trying to place a queen in every board `N` times, the recursion
  // terminates.
> = {
  // End the recursion if the internal counter reached `N`.
  finish: B;
  // Otherwise, run `Step`, passing its resulting boards to another recursive call to
  // `Queens`.
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Step<N, B> extends infer G // Asign result to `G`
    ? nQueens<N, Cast<G, Array<any>>, Inc<C>>
    : never;
}[IsEqual<N, C> extends true ? 'finish' : 'next'];

// A helper function that iterates over the array of boards and call `Develop` on every one.
//
type S2 = Step<4, [[1], [2]]>; // [[4, 1], [3, 1], [4, 2]]
//
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
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Develop<N, Head<B>> extends infer G // Assign result to `G`
    ? Concat<R, Cast<G, Array<any>>> extends infer H // Assign result to `H`
      ? Step<N, Tail<B>, Cast<H, Array<any>>>
      : never
    : never;
}[B extends [] ? 'finish' : 'next'];

// Takes an existing board and returns an array of all possible boards that can be developed from
// it by placing a queen on the next row.
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
//
type S3 = Develop<4, [1]>; // [[4, 1], [3, 1]]
//
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
//
type S4 = IsSafe<3, [1]>; // true
//
type IsSafe<
  // The column number to check it's safe to place a queen on the board.
  X extends number,
  // The board, possibly with other queens already placed on, to check against.
  T extends Board,
  // An internal counter to track the how many times the recursion has run. It's used to determine
  // if another queen threatens the queen we want to place through one of the diagonals.
  N extends number = 1,
  // An internal variable that points to the first queen in the board.
  C extends number = Head<T>
> = {
  // If we finished iterating over the board and didn't find any queen that threatens our queen
  // then return `true`.
  finish: true;
  // Otherwise, we first check if both queens are on the same column by checking if their values are
  // the same. If they do, we return `false`.
  //
  // We don't need to check if both queens are on the same row because it's not possible with how
  // the board is modeled (See https://github.com/ronami/meta-typing/blob/master/src/n-queens/index.d.ts#L19).
  //
  // Finally, we check the left and right diagonals. To do that we keep track of how many times the
  // recursion has run with the variable `N`. We add or subtract `N` (depending if we check the left
  // or the right diagonal) from the value of the queen and compare it to the value of `X`. If it's
  // the same, then the two queens threaten each other and we return false.
  //
  // Otherwise, we keep checking until there are no more queens to check.
  next: IsEqual<X, C> extends false
    ? IsEqual<X, Add<C, N>> extends false
      ? IsEqual<X, Subtract<C, N>> extends false
        ? IsSafe<X, Tail<T>, Inc<N>> extends true
          ? true
          : false
        : false
      : false
    : false;
}[T extends [] ? 'finish' : 'next'];
