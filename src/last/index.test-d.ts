import { expectType } from 'tsd';
import { Last } from '.';

expectType<Last<[]>>(undefined);
expectType<Last<[5]>>(5);
expectType<Last<[1, 2, 3]>>(3);
expectType<Last<[1, 2, 3, 4, 5]>>(5);
