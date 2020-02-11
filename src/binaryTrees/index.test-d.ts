import { expectType } from 'tsd';
import { DepthFirst, BreadthFirst, Leaf, Branch, Empty, Tree1 } from '.';

type Tree2 = Leaf<'x'>;
type Tree3 = Branch<'x', Leaf<'y'>, Empty>;
type Tree4 = Branch<'x', Leaf<'y'>, Leaf<'z'>>;

// Depth-first
expectType<DepthFirst<Empty>>([]);
expectType<DepthFirst<Tree2>>(['x']);
expectType<DepthFirst<Tree3>>(['x', 'y']);
expectType<DepthFirst<Tree4>>(['x', 'y', 'z']);
expectType<DepthFirst<Tree1>>(['a', 'b', 'd', 'c', 'f', 'g', 'e']);

// Breadth-first
expectType<BreadthFirst<Empty>>([]);
expectType<BreadthFirst<Tree2>>(['x']);
expectType<BreadthFirst<Branch<'x', Leaf<'y'>, Empty>>>(['x', 'y']);
expectType<BreadthFirst<Tree4>>(['x', 'y', 'z']);
expectType<BreadthFirst<Tree1>>(['a', 'b', 'c', 'd', 'f', 'g', 'e']);
