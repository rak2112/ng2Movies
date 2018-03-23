import { ActionReducerMap } from '@ngrx/store';

//import { authenticateUser, searchedMovies, movieDetail } from './movies.reducer';
//import { user } from './user.entities';

import {
	ApiState,
	apiReducer,
	Movies,
	allGenres,
	moviesReducer,
	searchedMovies,
	SearchMovies,
	user
} from './entities';
import { IUser, IGenres } from './../models';

export interface State {
	readonly api: ApiState,
	readonly genres: IGenres,
	readonly movies: Movies,
	readonly searchedMovies: SearchMovies, 
	readonly user: IUser
};

export const reducers: ActionReducerMap<State> = {
	api: apiReducer,
	genres: allGenres,
	movies: moviesReducer,
	searchedMovies,
	user
};
export const metaReducers = [];