import { expectType } from 'tsd';
import { Lte } from '.';

expectType<Lte<0, 3>>(true);
expectType<Lte<4, 0>>(false);
expectType<Lte<5, 8>>(true);
expectType<Lte<9, 2>>(false);
expectType<Lte<1, 1>>(true);
expectType<Lte<0, 0>>(true);
