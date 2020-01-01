import { expectType } from 'tsd';
import { InRange } from '.';

expectType<InRange<0, 0, 0>>(true);
expectType<InRange<3, 3, 3>>(true);
expectType<InRange<4, 0, 2>>(false);
expectType<InRange<2, 0, 1>>(false);
expectType<InRange<2, 0, 2>>(true);
expectType<InRange<6, 1, 7>>(true);
expectType<InRange<8, 1, 7>>(false);
