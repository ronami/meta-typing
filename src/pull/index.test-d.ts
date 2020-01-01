import { expectType } from 'tsd';
import { Pull } from '.';

expectType<Pull<[], []>>([]);
expectType<Pull<[], ['a']>>([]);
expectType<Pull<['a'], ['a']>>([]);
expectType<Pull<['a'], ['b']>>(['a']);
expectType<Pull<['a', 'c', 'a'], ['c']>>(['a', 'a']);
expectType<Pull<['a', 'c', 'a'], ['d']>>(['a', 'c', 'a']);
expectType<Pull<['a', 'b', 'c', 'a', 'b', 'c'], ['a', 'c']>>(['b', 'b']);
