import { expectType } from 'tsd';
import { Flatten } from '.';

expectType<Flatten<[]>>([]);
expectType<Flatten<[[1]]>>([1]);
expectType<Flatten<[1, 2, 3]>>([1, 2, 3]);
expectType<Flatten<[[1], [2], 3]>>([1, 2, 3]);
expectType<Flatten<[[1, 2], 3]>>([1, 2, 3]);
expectType<Flatten<[[[1, 2]], 3]>>([[1, 2], 3]);
