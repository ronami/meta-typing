import {
  IsNever,
  Dec,
  Unshift,
  Cast,
  Inc,
  Head,
  Reverse,
  Includes,
  Tail,
  Concat,
} from '..';

// A type to represent a cell that can be passed through.
type Passable = ' ';

// A type to represent a cell that cannot be passed through.
type Obstacle = '#';

// A type to represent the start position of the maze.
type Start = 'S';

// A type to represent the end of the maze, getting here is the goal.
type End = 'E';

// A type that represents a single cell in a maze.
type Tile = Passable | Obstacle | Start | End;

// A position in the maze represented as [X, Y].
type Position = [number, number];

// A solution to a maze is an array of positions. It describes how to get from
// one point in the maze to the goal.
type Solution = Array<Position>;

// A maze is a matrix of tiles.
type Maze = Array<Array<Tile>>;

// Returns the shortest solution to the goal if it exists or false otherwise:
// https://en.wikipedia.org/wiki/Maze_solving_algorithm.
//
type S1 = SolveMaze<
  [
    // Example maze, solution is (read from left to right):
    // [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2], [2, 3]]
    ['S', '#', '#'],
    [' ', ' ', ' '],
    ['#', '#', ' '],
    ['#', '#', 'E'],
  ]
>;
//
// This type uses recursive (and not officially supported) type alias, see more:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type SolveMaze<
  // The maze to solve.
  M extends Maze
> =
  // Finds the start position, then runs `SolveRecursive` with the maze and the
  // start position.
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  FindStartPosition<M> extends infer G // Assign result to `G`
    ? SolveRecursive<M, Cast<G, Array<Solution>>>
    : never;

// Recursively expand the possible solutions of a maze with breath-first-search
// (See https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/tree/breadth-first-search)
// until it finds a solution or no solutions remain.
type SolveRecursive<
  // The maze to solve.
  M extends Maze,
  // A queue to hold possible solutions. Starts with a single solution at the starting
  // position.
  S extends Array<Solution>
> = {
  // If the queue is empty then we ruled out all possible solutions. Return `false`.
  'no-solution': false;
  // If the queue is a single solution then it reached the goal (End), return it in
  // reverse so the solution reads from left to right.
  'found-solution': Reverse<S>;
  // Otherwise, keep going by advancing all solutions one step further.
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Step<M, S> extends infer G // Assign result to `G`
    ? SolveRecursive<M, Cast<G, Array<any>>>
    : never;
}[S extends []
  ? 'no-solution'
  : S extends Solution
  ? 'found-solution'
  : 'next'];

// Finds the first occurrence of `Start` in a maze and returns its position ([X, Y]).
type FindStartPosition<
  // The maze to solve.
  M extends Maze,
  // An internal variable to track the X coordinate.
  X extends number = 0,
  // An internal variable to track the Y coordinate.
  Y extends number = 0
> = {
  // If the current position of X and Y has the value of `Start` on the board, return
  // those coordinates as the first solution.
  found: [[[Y, X]]];
  // If we reached the final row then we didn't find the starting position anywhere.
  'not-found': [];
  // If we reached the end of this row, start searching at the beginning of the next row.
  'next-row': FindStartPosition<M, Inc<X>, 0>;
  // Otherwise, keep searching the current row on the next column.
  'next-column': FindStartPosition<M, X, Inc<Y>>;
}[M[X][Y] extends Start
  ? 'found'
  : X extends M['length']
  ? 'not-found'
  : M[X]['length'] extends Y
  ? 'next-row'
  : 'next-column'];

// Develops an array of solutions one step further and returns the array of new solutions.
type Step<
  // The maze to solve.
  M extends Maze,
  // The array of solutions to develop.
  S extends Array<Solution>,
  // An accumulator to collect the results.
  R extends Array<Solution> = [],
  // An internal variable to track the next solution.
  H extends Solution = Head<S>,
  // An internal variable to track the first position in the next solution.
  P extends Position = Head<H>
> = {
  // If we finished iterating on all solutions, return the accumulator.
  finish: R;
  // Next, check if the next solution just reached the end goal. If it did, return it
  // since this means the maze has been solved.
  done: H;
  // Otherwise, develop the next solution of `S` and concatenate its result into the
  // accumulator (`R`). Then, run the recursion again on the rest of the solutions.
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Concat<R, Develop<M, H>> extends infer G // Assign result to `G`
    ? Step<M, Tail<S>, Cast<G, Array<any>>>
    : never;
}[S extends [] ? 'finish' : M[P[1]][P[0]] extends End ? 'done' : 'next'];

// Takes a solution and returns an array of solutions this solution can develop to.
// If all four directions (up, down, left, and right) are safe to move to, 4 new solutions
// will be returned.
type Develop<
  // The maze to solve.
  M extends Maze,
  // The solution to develop.
  S extends Solution,
  // An internal variable for the last positon in the solution.
  P extends Position = Head<S>,
  // An internal variable to track the X coordinate of the last position.
  X extends number = P[0],
  // An internal variable to track the Y coordinate of the last position.
  Y extends number = P[1]
> =
  // Filter only safe solutions. See IsSafe bellow for details.
  OnlySafe<
    // Pass the maze so it's availble
    M,
    [
      // Develop the current solution by moving east.
      Unshift<S, [Inc<X>, Y]>,
      // Develop the current solution by moving south.
      Unshift<S, [X, Inc<Y>]>,
      // Develop the current solution by moving west.
      Unshift<S, [Dec<X>, Y]>,
      // Develop the current solution by moving north.
      Unshift<S, [X, Dec<Y>]>,
    ]
  >;

// Takes an array of solutions and filters only safe solutions. See IsSafe bellow for
// details.
type OnlySafe<
  // The maze to solve.
  M extends Maze,
  // The array of solutions to filter.
  S extends Array<Solution>,
  // An accumulator to collect the filtered results.
  R extends Array<Solution> = []
> = {
  // If we finished iterating over all solutions, return the accumulated result.
  finish: R;
  // Then, if the next solution is safe, add it to the accumulator and run again.
  insert: OnlySafe<M, Tail<S>, Unshift<R, Head<S>>>;
  // Otherwise, run again but don't add this solution to the accumulator so it's skipped.
  skip: OnlySafe<M, Tail<S>, R>;
}[S extends []
  ? 'finish'
  : IsSafe<M, Head<S>> extends true
  ? 'insert'
  : 'skip'];

// Checks if the last position placed in a solution is safe.
type IsSafe<
  // The maze to solve.
  M extends Maze,
  // The solution to check.
  S extends Solution,
  // An internal variable for the last positon in the solution.
  P extends Position = Head<S>,
  // An internal variable to track the X coordinate of the last position.
  X extends number = P[0],
  // An internal variable to track the Y coordinate of the last position.
  Y extends number = P[1]
> =
  // Start by checking if either the X or Y values are never. This can happen if any of
  // them went bellow 0.
  //
  // Then check if the values on X and Y point on the board are `undefined`. This can
  // happen if they're outide the board.
  //
  // Next check if the value of the board is an obstacle. If it is, we can't go there.
  //
  // Finally, make sure we don't move to a tile we already been.
  //
  // If none of these things apply, this solution is considered safe.
  IsNever<Y> extends true
    ? false
    : IsNever<X> extends true
    ? false
    : M[Y] extends undefined
    ? false
    : M[Y][X] extends undefined
    ? false
    : M[Y][X] extends Obstacle
    ? false
    : Includes<Tail<S>, Head<S>> extends true
    ? false
    : true;
