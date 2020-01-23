import { Concat } from '..';

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
//     d       e
//            / \
//           f   g
//
type Tree1 = Branch<
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

// A function that iterates over a tree and returns an array with the values of its
// leaves (Reminder: leaves are trees with a value and no children).
export type Leaves<T extends Tree<any, any, any>> = {
  // If the tree is `Empty` then it has no value and no children. Return an empty array.
  finish: [];
  // Next, check if the tree is a `Branch` with both of its children `Empty`. If it is,
  // then it's a leaf. Return an array with its value.
  leaf: [T extends Branch<infer V, any, any> ? V : never];
  // Otherwise, use `infer` to match the values of the left and the right trees. Then,
  // run `Leaves` recursively on both and concatenate the resulting arrays.
  next: T extends Branch<infer V, infer L, infer R>
    ? Concat<Leaves<L>, Leaves<R>>
    : never;
}[T extends Empty
  ? 'finish'
  : T extends Branch<any, Empty, Empty>
  ? 'leaf'
  : 'next'];
