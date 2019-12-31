import { expectType } from 'tsd';
import { Gte } from '.';

expectType<Gte<0, 3>>(false);
expectType<Gte<4, 0>>(true);
expectType<Gte<1, 1>>(true);
expectType<Gte<0, 0>>(true);
