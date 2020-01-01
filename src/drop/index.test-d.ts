import { expectType } from 'tsd';
import { Drop } from '.';

expectType<Drop<[], 0>>([]);
expectType<Drop<[], 5>>([]);
expectType<Drop<[1], 0>>([1]);
expectType<Drop<[1, 2, 3], 0>>([1, 2, 3]);
expectType<Drop<[1, 2, 3], 1>>([2, 3]);
expectType<Drop<[1, 2, 3], 2>>([3]);
expectType<Drop<[1, 2, 3, 4, 5, 6], 2>>([3, 4, 5, 6]);
expectType<Drop<[1, 2, 3, 4, 5, 6], 4>>([5, 6]);
expectType<Drop<[1, 2, 3, 4, 5, 6], 8>>([]);
