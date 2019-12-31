import { expectType } from 'tsd';
import { Nth } from '.';

expectType<Nth<[]>>(undefined);
expectType<Nth<[1]>>(1);
expectType<Nth<[3, 2, 1]>>(3);
expectType<Nth<[1, 2, 3], 1>>(2);
expectType<Nth<[1, 2, 3, 4, 5], 2>>(3);
expectType<Nth<[5, 4, 3, 2, 1], 4>>(1);
expectType<Nth<[1, 2, 3], 6>>(undefined);
