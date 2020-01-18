import { expectType } from 'tsd';
import { Divide } from '.';

expectType<Divide<4, 0>>(this as never);
expectType<Divide<0, 0>>(0);
expectType<Divide<0, 3>>(0);
expectType<Divide<6, 1>>(6);
expectType<Divide<4, 2>>(2);
expectType<Divide<8, 2>>(4);
expectType<Divide<9, 3>>(3);
expectType<Divide<8, 4>>(2);
expectType<Divide<6, 4>>(1);
expectType<Divide<2, 4>>(0);
expectType<Divide<7, 3>>(2);
