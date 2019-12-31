import { expectType } from 'tsd';
import { IndexOf } from '.';

expectType<IndexOf<[], 1>>(-1);
expectType<IndexOf<[1], 1>>(0);
expectType<IndexOf<[1, 2, 3], 1>>(0);
expectType<IndexOf<[3, 2, 1], 1>>(2);
expectType<IndexOf<[3, 2, 1, 2, 3], 1>>(2);
expectType<IndexOf<[3, 2, 1, 2, 3], 3>>(0);
expectType<IndexOf<['h', 'e', 'l', 'l', 'o'], 'l'>>(2);
expectType<IndexOf<['h', 'e', 'l', 'l', 'o'], 'x'>>(-1);
