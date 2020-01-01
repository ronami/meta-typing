import { expectType } from 'tsd';
import { Take } from '.';

expectType<Take<[], 0>>([]);
expectType<Take<[], 4>>([]);
expectType<Take<[1, 2, 3]>>([1]);
expectType<Take<[1, 2, 3], 2>>([1, 2]);
expectType<Take<[1, 2, 3], 5>>([1, 2, 3]);
expectType<Take<[1, 2, 3], 0>>([]);
