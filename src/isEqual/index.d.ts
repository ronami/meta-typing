export type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
