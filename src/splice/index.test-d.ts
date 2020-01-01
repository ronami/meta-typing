import { expectType } from 'tsd';
import { Splice } from '.';

expectType<Splice<[], 0, 0>>([]);
expectType<Splice<[1, 2, 3], 0, 0>>([]);
expectType<Splice<[1, 2, 3, 4, 5, 6], 0, 3>>([1, 2, 3]);
expectType<Splice<[1, 2, 3, 4, 5, 6], 0, 5>>([1, 2, 3, 4, 5]);
expectType<Splice<[1, 2, 3, 4, 5, 6], 1, 3>>([2, 3, 4]);
expectType<Splice<[1, 2, 3, 4, 5, 6], 3, 2>>([4, 5]);
expectType<Splice<[1, 2, 3, 4, 5, 6], 3, 9>>([4, 5, 6]);
expectType<Splice<[1, 2, 3, 4, 5, 6], 3, 0>>([]);
