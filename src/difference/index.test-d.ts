import { expectType } from 'tsd';
import { Difference } from '.';

expectType<Difference<[], []>>([]);
expectType<Difference<[1], []>>([1]);
expectType<Difference<[1, 2], [3]>>([1, 2]);
expectType<Difference<[1, 2, 3], [3]>>([1, 2]);
expectType<Difference<[1, 2, 3], [3, 1]>>([2]);
expectType<Difference<[1, 2, 3], []>>([1, 2, 3]);
expectType<Difference<[], [1, 2, 3]>>([]);
