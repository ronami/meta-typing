import { expectType } from 'tsd';
import { Intersection } from '.';

expectType<Intersection<[]>>([]);
expectType<Intersection<[[], []]>>([]);
expectType<Intersection<[[1], []]>>([]);
expectType<Intersection<[[1, 2], [3]]>>([]);
expectType<Intersection<[[1, 2, 3], [3]]>>([3]);
expectType<Intersection<[[1, 2, 3], [3, 1]]>>([1, 3]);
expectType<Intersection<[[1, 2, 3], []]>>([]);
expectType<Intersection<[[], [1, 2, 3]]>>([]);
expectType<Intersection<[[1, 2, 3], [1, 2, 3]]>>([1, 2, 3]);
