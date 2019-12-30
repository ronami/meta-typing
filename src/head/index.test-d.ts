import { expectType } from 'tsd';
import { Head } from '.';

expectType<Head<[]>>(this as never);
expectType<Head<[1]>>(1);
expectType<Head<[3, 2]>>(3);
