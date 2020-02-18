import { expectType } from 'tsd';
import { SolveMaze } from '.';

// Simple maze
expectType<
  SolveMaze<
    [
      //
      ['S', '#'],
      [' ', 'E'],
      ['#', '#'],
    ]
  >
>([
  [0, 0],
  [0, 1],
  [1, 1],
]);

// No solution
expectType<
  SolveMaze<
    [
      //
      ['S', '#'],
      ['#', 'E'],
      ['#', '#'],
    ]
  >
>(false);

// Complex maze
expectType<
  SolveMaze<
    [
      //
      ['S', '#', '#', '#'],
      [' ', ' ', ' ', '#'],
      ['#', '#', ' ', '#'],
      ['#', '#', ' ', 'E'],
    ]
  >
>([
  [0, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [2, 2],
  [2, 3],
  [3, 3],
]);

// Multiple solutions, should find the shortest path
expectType<
  SolveMaze<
    [
      [' ', ' ', ' ', ' '],
      [' ', 'S', ' ', ' '],
      ['E', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
    ]
  >
>([
  [1, 1],
  [0, 1],
  [0, 2],
]);
