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
} from '..';

// A type to represent a cell that can be passed through.
type Passable = '.';

// A type to represent a cell that cannot be passed through.
type Obstacle = '#';

// A type to represent the end of the maze, getting here is the goal.
type End = 'E';

// A type that represents a single cell in a maze.
type Tile = Passable | Obstacle | End;

// A position in the maze represented as [X, Y].
type Position = [number, number];

// A solution to a maze is an array of positions. It describes how to get from
// one point in the maze to the goal.
type Solution = Array<Position>;

// A maze is a matrix of tiles. The start position is always [0, 0], which is the
// top-left corner.
//
// For example:
//
// ['.', '#', '#', '#'],
// ['.', '.', '.', '#'],
// ['#', '#', '.', '#'],
// ['#', '#', '.', 'E'],
//
type Maze = Array<Array<Tile>>;

//
export type SolveMaze<
  // The maze to solve.
  M extends Maze,
  // A queue to hold possible solutions. Starts with a single solution with the
  // starting position at the top-left corner.
  S extends Array<Solution> = [[[0, 0]]]
> = {
  //
  'no-solution': false;
  //
  'found-solution': Reverse<S>;
  //
  next: Step<M, S> extends infer G ? SolveMaze<M, Cast<G, Array<any>>> : never;
}[S extends []
  ? 'no-solution'
  : S extends Solution
  ? 'found-solution'
  : 'next'];

//
type Step<
  //
  M extends Maze,
  //
  S extends Array<Solution>,
  //
  R extends Array<Solution> = [],
  //
  H extends Solution = Head<S>,
  //
  P extends Position = Head<H>
> = {
  //
  finish: R;
  //
  next: Step<M, Tail<S>, Develop<M, H>>;
  //
  done: H;
}[S extends [] ? 'finish' : M[P[1]][P[0]] extends End ? 'done' : 'next'];

//
type Develop<
  //
  M extends Maze,
  //
  S extends Solution,
  //
  P extends Position = Head<S>,
  //
  X extends number = P[0],
  //
  Y extends number = P[1]
> = OnlySafe<
  M,
  [
    //
    Unshift<S, [Inc<X>, Y]>,
    //
    Unshift<S, [X, Inc<Y>]>,
    //
    Unshift<S, [Dec<X>, Y]>,
    //
    Unshift<S, [X, Dec<Y>]>,
  ]
>;

//
type OnlySafe<
  //
  M extends Maze,
  //
  S extends Array<Solution>,
  //
  R extends Array<Solution> = []
> = {
  //
  finish: R;
  //
  insert: OnlySafe<M, Tail<S>, Unshift<R, Head<S>>>;
  //
  skip: OnlySafe<M, Tail<S>, R>;
}[S extends []
  ? 'finish'
  : IsSafe<M, Head<S>> extends true
  ? 'insert'
  : 'skip'];

//
type IsSafe<
  //
  M extends Maze,
  //
  S extends Solution,
  //
  P extends Position = Head<S>,
  //
  X extends number = P[0],
  //
  Y extends number = P[1]
> =
  //
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
