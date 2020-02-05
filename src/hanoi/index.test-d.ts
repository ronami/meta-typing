import { expectType } from 'tsd';
import { Hanoi } from '.';

expectType<Hanoi<2>>([
  ['a', 'c'],
  ['a', 'b'],
  ['c', 'b'],
]);
expectType<Hanoi<3>>([
  ['a', 'b'],
  ['a', 'c'],
  ['b', 'c'],
  ['a', 'b'],
  ['c', 'a'],
  ['c', 'b'],
  ['a', 'b'],
]);
