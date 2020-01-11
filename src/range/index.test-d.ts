import { expectType } from 'tsd';
import { Range } from '.';

expectType<Range<0, 0>>([]);
expectType<Range<0, 1>>([0]);
expectType<Range<1, 6>>([1, 2, 3, 4, 5]);
expectType<Range<3, 8>>([3, 4, 5, 6, 7]);
