import { expectType } from 'tsd';
import { Concat } from '.';

expectType<Concat<[], []>>([]);
expectType<Concat<[1], []>>([1]);
expectType<Concat<[1], [2, 3]>>([1, 2, 3]);
expectType<Concat<[], [1, 2]>>([1, 2]);
expectType<Concat<[1, 2, 3], [4, 5, 6]>>([1, 2, 3, 4, 5, 6]);
