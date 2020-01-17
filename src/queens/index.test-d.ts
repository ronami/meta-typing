import { expectType } from 'tsd';
import { nQueens } from '.';

expectType<nQueens<0>>([[]]);
expectType<nQueens<1>>([[1]]);
expectType<nQueens<2>>([]);
expectType<nQueens<3>>([]);
expectType<nQueens<4>>([
  [3, 1, 4, 2],
  [2, 4, 1, 3],
]);
