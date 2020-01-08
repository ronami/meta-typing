import { expectType } from 'tsd';
import { Chunk } from '.';

expectType<Chunk<[]>>([]);
expectType<Chunk<[1, 2, 3], 1>>([[1], [2], [3]]);
expectType<Chunk<[], 2>>([]);
expectType<Chunk<[1], 2>>([[1]]);
expectType<Chunk<[1, 2, 3], 2>>([[1, 2], [3]]);
expectType<Chunk<[1, 2, 3, 4], 2>>([
  [1, 2],
  [3, 4],
]);
expectType<Chunk<[1, 2, 3, 4], 3>>([[1, 2, 3], [4]]);
expectType<Chunk<[1, 2, 3, 4, 5, 6, 7], 3>>([[1, 2, 3], [4, 5, 6], [7]]);
expectType<Chunk<[1, 2, 3, 4, 5, 6, 7], 4>>([
  [1, 2, 3, 4],
  [5, 6, 7],
]);
