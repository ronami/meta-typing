import { expectType } from 'tsd';
import { Slice } from '.';

expectType<Slice<[], 0, 0>>([]);
expectType<Slice<[1, 2, 3], 0, 0>>([]);
expectType<Slice<[1, 2, 3, 4, 5, 6], 0, 3>>([1, 2, 3]);
expectType<Slice<[1, 2, 3, 4, 5, 6], 0, 5>>([1, 2, 3, 4, 5]);
expectType<Slice<[1, 2, 3, 4, 5, 6], 1, 3>>([2, 3, 4]);
expectType<Slice<[1, 2, 3, 4, 5, 6], 3, 2>>([4, 5]);
expectType<Slice<[1, 2, 3, 4, 5, 6], 3, 9>>([4, 5, 6]);
expectType<Slice<[1, 2, 3, 4, 5, 6], 3, 0>>([]);
