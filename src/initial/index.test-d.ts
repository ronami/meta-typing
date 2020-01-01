import { expectType } from 'tsd';
import { Initial } from '.';

expectType<Initial<[]>>([]);
expectType<Initial<[5]>>([]);
expectType<Initial<[1, 2, 3]>>([1, 2]);
expectType<Initial<[1, 2, 3, 4, 5]>>([1, 2, 3, 4]);
