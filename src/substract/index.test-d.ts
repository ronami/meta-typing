import { expectType } from 'tsd';
import { Substract } from '.';

expectType<Substract<3, 0>>(3);
expectType<Substract<1, 1>>(0);
expectType<Substract<4, 4>>(0);
expectType<Substract<4, 1>>(3);
expectType<Substract<9, 3>>(6);
expectType<Substract<2, 4>>(this as never);
