import { expectType } from 'tsd';
import { Leaves, Leaf, Branch, Empty } from '.';

expectType<Leaves<Empty>>([]);
expectType<Leaves<Leaf<'x'>>>(['x']);
expectType<Leaves<Branch<'x', Leaf<'y'>, Empty>>>(['y']);
expectType<Leaves<Branch<'x', Leaf<'y'>, Leaf<'z'>>>>(['y', 'z']);
