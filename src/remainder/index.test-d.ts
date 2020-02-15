import { expectType } from 'tsd';
import { Remainder } from '.';

expectType<Remainder<1, 1>>(0);
expectType<Remainder<0, 1>>(0);
expectType<Remainder<5, 2>>(1);
expectType<Remainder<5, 3>>(2);
expectType<Remainder<0, 4>>(0);
expectType<Remainder<4, 7>>(4);
expectType<Remainder<1, 0>>(this as never);
