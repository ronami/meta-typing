import { expectType } from 'tsd';
import { Zip } from '.';

expectType<Zip<[[]]>>([]);
expectType<Zip<[[], []]>>([]);
expectType<Zip<[['barney', 'fred'], [36, 40]]>>([
  ['barney', 36],
  ['fred', 40],
]);
expectType<Zip<[['barney', 'fred'], [36, 40], [false, true]]>>([
  ['barney', 36, false],
  ['fred', 40, true],
]);
