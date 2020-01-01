import { expectType } from 'tsd';
import { Clamp } from '.';

expectType<Clamp<5, 0, 7>>(5);
expectType<Clamp<3, 2, 4>>(3);
expectType<Clamp<4, 4, 4>>(4);
expectType<Clamp<7, 3, 5>>(5);
expectType<Clamp<2, 4, 6>>(4);
