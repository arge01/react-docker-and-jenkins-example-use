import { Iinital } from '@/services';

/**
 * input_filtrable
 */
import input_filtrable from '@/components/Forms/reducers/filtrable';
import { Iinital as INITIAL_IINPUT_FLTRABLE } from '@/components/Forms/reducers/filtrable/initial';

/**
 * services
 */
import movies from '@/services/movies/reducer';
import { IENTITY, IMODEL as IMOVIES } from '@/services/movies/initial';

import { combineReducers } from 'redux';

export interface IState {
  input_filtrable: INITIAL_IINPUT_FLTRABLE;
  movies: Iinital<IMOVIES, IENTITY>;
}

export interface ReducerModel<IMODEL> {
  initial: Iinital<IMODEL, IENTITY>;
  name: 'movies';
}

const reducers = combineReducers<IState>({
  input_filtrable,
  movies,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
