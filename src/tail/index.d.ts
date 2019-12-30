export type Tail<Tuple extends Array<any>> = ((...t: Tuple) => void) extends (
  h: any,
  ...rest: infer R
) => void
  ? R
  : never;
