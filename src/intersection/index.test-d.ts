import { expectType } from 'tsd';
import { intersection } from '.';

expectType<intersection<[], []>>([]);
expectType<intersection<[1], []>>([]);
expectType<intersection<[1, 2], [3]>>([]);
expectType<intersection<[1, 2, 3], [3]>>([3]);
expectType<intersection<[1, 2, 3], [3, 1]>>([1, 3]);
expectType<intersection<[1, 2, 3], []>>([]);
expectType<intersection<[], [1, 2, 3]>>([]);
expectType<intersection<[1, 2, 3], [1, 2, 3]>>([1, 2, 3]);
