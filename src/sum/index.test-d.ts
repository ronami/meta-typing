import { expectType } from 'tsd';
import { Sum } from '.';

expectType<Sum<[]>>(0);
expectType<Sum<[1]>>(1);
expectType<Sum<[5]>>(5);
expectType<Sum<[1, 2, 3]>>(6);
expectType<Sum<[3, 4, 1, 1]>>(9);
expectType<Sum<[7, 6]>>(this as never);
