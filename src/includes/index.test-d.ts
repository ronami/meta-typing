import { expectType } from 'tsd';
import { Includes } from '.';

expectType<Includes<[], 1>>(false);
expectType<Includes<[1], 1>>(true);
expectType<Includes<[1, 2, 3], 1>>(true);
expectType<Includes<[2, 2, 3, 1], 1>>(true);
expectType<Includes<[2, 2, 3], 1>>(false);
expectType<Includes<[2, 2], 3>>(false);
