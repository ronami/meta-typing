import { expectType } from 'tsd';
import { Zip } from '.';

expectType<Zip<[]>>([]);
expectType<Zip<[[1]]>>([]);
expectType<Zip<[]>>([]);
expectType<Zip<[]>>([]);
expectType<Zip<[]>>([]);
expectType<Zip<[]>>([]);
expectType<Zip<[]>>([]);
