import { expectType } from 'tsd';
import { Compact } from '.';

expectType<Compact<[]>>([]);
expectType<Compact<[1, 2, 3]>>([1, 2, 3]);
expectType<Compact<[1, 2, 0, 3]>>([1, 2, 3]);
expectType<Compact<[1, 2, '', false, 3, undefined]>>([1, 2, 3]);
expectType<Compact<[0, null, 3, '', 'hello', 1, undefined]>>([3, 'hello', 1]);
