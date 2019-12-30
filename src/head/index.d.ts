export type Head<T extends Array<any>> = T extends [infer H, ...Array<any>]
  ? H
  : never;
