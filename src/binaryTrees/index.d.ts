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

//
export type DepthFirst<
  //
  T extends Tree<any, any, any>
> = {
  //
  finish: [];
  //
  next: T extends Branch<infer V, infer L, infer R>
    ? DepthFirst<L> extends infer G
      ? DepthFirst<R> extends infer H
        ? Concat<Cast<G, Array<any>>, Cast<H, Array<any>>> extends infer J
          ? Unshift<Cast<J, Array<any>>, V>
          : never
        : never
      : never
    : never;
}[T extends Empty ? 'finish' : 'next'];

//
export type BreadthFirst<
  //
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
  next: ExtractNodes<Q> extends infer G
    ? ExtractValues<Q> extends infer J
      ? Concat<R, Cast<J, Array<any>>> extends infer H
        ? Breadth<Cast<G, Array<any>>, Cast<H, Array<any>>>
        : never
      : never
    : never;
}[Q extends [] ? 'finish' : 'next'];

//
type ExtractValues<
  //
  T extends Array<Tree<any, any, any>>,
  //
  R extends Array<any> = []
> = {
  //
  finish: Reverse<R>;
  //
  next: ExtractValues<Tail<T>, Unshift<R, ExtractValue<Head<T>>>>;
}[T extends [] ? 'finish' : 'next'];

//
type ExtractNodes<
  //
  T extends Array<Tree<any, any, any>>,
  //
  R extends Array<any> = []
> = {
  //
  finish: R;
  //
  next: Concat<R, ExtractNode<Head<T>>> extends infer H
    ? ExtractNodes<Tail<T>, Cast<H, Array<any>>>
    : never;
}[T extends [] ? 'finish' : 'next'];

//
type ExtractValue<
  //
  T extends Tree<any, any, any>
> =
  //
  T extends Tree<infer V, any, any> ? V : never;

//
type ExtractNode<
  //
  T extends Tree<any, any, any>
> =
  //
  T extends Leaf<any>
    ? []
    : T extends Tree<any, Empty, infer R>
    ? [R]
    : T extends Tree<any, infer L, Empty>
    ? [L]
    : T extends Tree<any, infer L, infer R>
    ? [L, R]
    : never;
