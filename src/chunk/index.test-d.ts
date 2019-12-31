import { expectType } from 'tsd';
import { Chunk } from '.';

expectType<Chunk<[]>>([]);
expectType<Chunk<[1]>>([[1]]);
expectType<Chunk<[1, 2, 3]>>([[1, 2], [3]]);
expectType<Chunk<[1, 2, 3, 4]>>([
  [1, 2],
  [3, 4],
]);
