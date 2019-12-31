import { expectType } from 'tsd';
import { Multiply } from '.';

expectType<Multiply<0, 3>>(0);
expectType<Multiply<4, 0>>(0);
expectType<Multiply<1, 1>>(1);
expectType<Multiply<1, 5>>(5);
expectType<Multiply<4, 1>>(4);
expectType<Multiply<3, 3>>(9);
expectType<Multiply<2, 4>>(8);
expectType<Multiply<3, 5>>(this as never);
