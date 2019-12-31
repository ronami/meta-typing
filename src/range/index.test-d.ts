import { expectType } from 'tsd';
import { Range } from '.';

expectType<Range<0>>([]);
expectType<Range<1>>([1]);
expectType<Range<5>>([1, 2, 3, 4, 5]);
expectType<Range<8>>([1, 2, 3, 4, 5, 6, 7, 8]);
