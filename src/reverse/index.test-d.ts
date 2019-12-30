import { expectType } from 'tsd';
import { Reverse } from '.';

expectType<Reverse<[]>>([]);
expectType<Reverse<[1]>>([1]);
expectType<Reverse<[1, 2, 3]>>([3, 2, 1]);
