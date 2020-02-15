import { expectType } from 'tsd';
import { Lt } from '.';

expectType<Lt<0, 3>>(true);
expectType<Lt<4, 0>>(false);
expectType<Lt<5, 8>>(true);
expectType<Lt<9, 2>>(false);
expectType<Lt<1, 1>>(false);
expectType<Lt<0, 0>>(false);
