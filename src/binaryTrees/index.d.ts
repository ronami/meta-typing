import { Concat, Cast, Unshift, Reverse, Head, Tail } from '..';

// A binary tree is either empty or it has a value and two children, both of which are
// binary trees themselves.
//
// For example, here is how a binary tree can be visualized:
//
//        1
//       / \
//      /   \
//     2     \
//    / \     3
//   4   5   / \
//          9   \
//               8
//              / \
//             6   7
//

// A type to represent an empty tree.
export interface Empty {
  empty: true;
}

// A type to represent a tree with a value and two children.
export interface Branch<
  // The value this tree holds.
  A,
  // The left child.
  L extends Tree<any, any, any>,
  // The right child.
  R extends Tree<any, any, any>
> {
  value: A;
  left: L;
  right: R;
}

// A tree can either be empty or it's composed of a value and two children.
export type Tree<
  A,
  L extends Tree<any, any, any>,
  R extends Tree<any, any, any>
> = Empty | Branch<A, L, R>;

// A helper type to create leaf trees (Trees that have no children).
export type Leaf<A> = Branch<A, Empty, Empty>;

// An example tree. Here's how it's visualized:
//
//         a
//        / \
//       b   c
//      /     \
//     d       f
//            / \
//           g   e
//
export type Tree1 = Branch<
  // Value.
  'a',
  // Left child.
  Branch<
    // Value.
    'b',
    // Left child.
    Leaf<'d'>,
    Empty
  >,
  // Right child.
  Branch<
    // Value.
    'c',
    // Left child.
    Empty,
    // Right child.
    Branch<
      // Value.
      'f',
      // Left child.
      Leaf<'g'>,
      // Right child.
      Leaf<'e'>
    >
  >
>;

// Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures.
// One starts at the root (selecting some arbitrary node as the root in the case of a graph) and
// explores as far as possible along each branch before backtracking./
//
// As an example, the following will return an array with all values of a tree.
//
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/tree/depth-first-search.
export type DepthFirst<
  // The input tree.
  T extends Tree<any, any, any>
> = {
  //
  finish: [];
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: T extends Branch<infer V, infer L, infer R>
    ? DepthFirst<L> extends infer G // Assign result to `G`
      ? DepthFirst<R> extends infer H // Assign result to `H`
        ? Concat<Cast<G, Array<any>>, Cast<H, Array<any>>> extends infer J // Assign result to `J`
          ? Unshift<Cast<J, Array<any>>, V>
          : never
        : never
      : never
    : never;
}[T extends Empty ? 'finish' : 'next'];

// Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data
// structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred
// to as a 'search key') and explores the neighbor nodes first, before moving to the next level
// neighbors.
//
// As an example, the following will return an array with all values of a tree.
//
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/tree/breadth-first-search.
export type BreadthFirst<
  // The input tree.
  T extends Tree<any, any, any>
> =
  //
  T extends Empty ? [] : Breadth<[T]>;

//
type Breadth<
  //
  Q extends Array<Tree<any, any, any>>,
  //
  R extends Array<any> = []
> = {
  //
  finish: R;
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: ExtractNodes<Q> extends infer G // Assign result to `G`
    ? ExtractValues<Q> extends infer J // Assign result to `J`
      ? Concat<R, Cast<J, Array<any>>> extends infer H // Assign result to `H`
        ? Breadth<Cast<G, Array<any>>, Cast<H, Array<any>>>
        : never
      : never
    : never;
}[Q extends [] ? 'finish' : 'next'];

// A helper function to map over an array and call `ExtractValue` for each of the trees
// in the array.
type ExtractValues<
  // The array of trees to iterate over.
  T extends Array<Tree<any, any, any>>,
  // An accumulator to collect the results.
  R extends Array<any> = []
> = {
  // If the array is empty, return the accumulator.
  finish: Reverse<R>;
  // Otherwise, call `ExtractValue` on the first element of the array, add its results
  // to the accumulator and run again recursively on the rest of the array.
  next: ExtractValues<Tail<T>, Unshift<R, ExtractValue<Head<T>>>>;
}[T extends [] ? 'finish' : 'next'];

// A helper function to map over an array and call `ExtractNode` for each of the trees
// in the array.
type ExtractNodes<
  // The array of trees to iterate over.
  T extends Array<Tree<any, any, any>>,
  // An accumulator to collect the results.
  R extends Array<any> = []
> = {
  // If the array is empty, return the accumulator.
  finish: R;
  // Otherwise, call `ExtractNode` on the first element of the array, add its results
  // to the accumulator and run again recursively on the rest of the array.
  //
  // Computation is split into multiple steps with `infer`, see more:
  // https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts#L17.
  next: Concat<R, ExtractNode<Head<T>>> extends infer H // Assign result to `H`
    ? ExtractNodes<Tail<T>, Cast<H, Array<any>>>
    : never;
}[T extends [] ? 'finish' : 'next'];

// Extracts the value out of a tree.
type ExtractValue<
  // The tree to extract the value out of.
  T extends Tree<any, any, any>
> =
  // Use `infer` to pattern-match the value inside the tree. See more:
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types.
  T extends Tree<infer V, any, any> ? V : never;

// Extracts the sub-trees out of a tree.
type ExtractNode<
  // The tree to extract from.
  T extends Tree<any, any, any>
> =
  // Check if the tree is a leaf (a tree with no children). If that's the case, return
  // an empty array (no results).
  //
  // Then, check if the tree only has its right child and return an array with that one
  // child.
  //
  // Next, do the same for the left child.
  //
  // Finally, if the tree has both of its child (not empty), return an array with both.
  T extends Leaf<any>
    ? []
    : T extends Tree<any, Empty, infer R>
    ? [R]
    : T extends Tree<any, infer L, Empty>
    ? [L]
    : T extends Tree<any, infer L, infer R>
    ? [L, R]
    : never;
