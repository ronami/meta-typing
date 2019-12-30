import { Head, Tail, Unshift } from '..';

export type Reverse<
  Tuple extends Array<any>,
  Result extends Array<any> = []
> = {
  1: Result;
  // @ts-ignore
  0: Reverse<Tail<Tuple>, Unshift<Result, Head<Tuple>>>;
}[Tuple extends [] ? 1 : 0];
