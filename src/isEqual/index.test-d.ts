import { expectType } from 'tsd';
import { IsEqual } from '.';

expectType<IsEqual<1, 1>>(true);
expectType<IsEqual<1, 2>>(false);

expectType<IsEqual<true, true>>(true);
expectType<IsEqual<true, false>>(false);

expectType<IsEqual<[], []>>(true);
expectType<IsEqual<[1], []>>(false);
expectType<IsEqual<[1, 2], [1, 2]>>(true);

expectType<IsEqual<{}, {}>>(true);
expectType<IsEqual<{ a: 'a' }, {}>>(false);
expectType<IsEqual<{ a: { b: { c: 'c' } } }, { a: { b: { c: 'c' } } }>>(true);
expectType<IsEqual<{ a: { b: { c: 'c' } } }, { a: { b: { c: 'd' } } }>>(false);
