import { expectType } from 'tsd';
import { Min } from '.';

expectType<Min<[]>>(this as never);
expectType<Min<[1]>>(1);
expectType<Min<[1, 4]>>(1);
expectType<Min<[6, 2]>>(2);
expectType<Min<[1, 5, 8, 2]>>(1);
expectType<Min<[3, 9, 2]>>(2);
