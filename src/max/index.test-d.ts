import { expectType } from 'tsd';
import { Max } from '.';

expectType<Max<[]>>(this as never);
expectType<Max<[1]>>(1);
expectType<Max<[1, 4]>>(4);
expectType<Max<[6, 1]>>(6);
expectType<Max<[1, 5, 8, 2]>>(8);
expectType<Max<[3, 9, 2, 1]>>(9);
