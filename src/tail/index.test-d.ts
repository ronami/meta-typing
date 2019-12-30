import { expectType } from 'tsd';
import { Tail } from '.';

expectType<Tail<[]>>([]);
expectType<Tail<[1]>>([]);
expectType<Tail<[1, 2]>>([2]);
expectType<Tail<[1, 2, 3, 4, 5]>>([2, 3, 4, 5]);
