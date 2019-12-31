import { expectType } from 'tsd';
import { Add } from '.';

expectType<Add<0, 3>>(3);
expectType<Add<4, 0>>(4);
expectType<Add<1, 1>>(2);
expectType<Add<1, 5>>(6);
expectType<Add<6, 3>>(9);
expectType<Add<6, 5>>(this as never);
