import { expectType } from 'tsd';
import { Subtract } from '.';

expectType<Subtract<3, 0>>(3);
expectType<Subtract<1, 1>>(0);
expectType<Subtract<4, 4>>(0);
expectType<Subtract<4, 1>>(3);
expectType<Subtract<9, 3>>(6);
expectType<Subtract<2, 14>>(this as never);
