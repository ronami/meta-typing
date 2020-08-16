import { expectType } from 'tsd';
import { Power } from '.';

expectType<Power<2, 3>>(8);
expectType<Power<3, 2>>(9);
expectType<Power<0, 0>>(1);
expectType<Power<0, 3>>(0);
expectType<Power<4, 0>>(1);
expectType<Power<1, 1>>(1);
expectType<Power<1, 5>>(1);
expectType<Power<4, 1>>(4);
expectType<Power<3, 5>>(this as never);
