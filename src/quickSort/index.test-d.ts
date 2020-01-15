import { expectType } from 'tsd';
import { QuickSort } from '.';

expectType<QuickSort<[]>>([]);
expectType<QuickSort<[1]>>([1]);
expectType<QuickSort<[1, 4]>>([1, 4]);
expectType<QuickSort<[6, 2, 9]>>([2, 6, 9]);
expectType<QuickSort<[9, 1, 6, 5, 8, 2, 7, 1]>>([1, 1, 2, 5, 6, 7, 8, 9]);
expectType<QuickSort<[3, 0, 9, 2]>>([0, 2, 3, 9]);
