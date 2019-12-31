import { expectType } from 'tsd';
import { Size } from '.';

expectType<Size<[]>>(0);
expectType<Size<[1]>>(1);
expectType<Size<[1, 4]>>(2);
expectType<Size<[6, 1]>>(2);
expectType<Size<[1, 5, 8]>>(3);
expectType<Size<[3, 9, 2, 1]>>(4);
