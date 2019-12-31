import { expectType } from 'tsd';
import { Uniq } from '.';

expectType<Uniq<[]>>([]);
expectType<Uniq<[1, 2]>>([1, 2]);
expectType<Uniq<[1, 2, 2, 3]>>([1, 2, 3]);
expectType<Uniq<[1, 2, 2, 3, 2, 2, 3, 3, 2, 1]>>([1, 2, 3]);
