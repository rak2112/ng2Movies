import { createSelector } from '@ngrx/store';
import { State } from '../reducers';

export const getMovies = (state: State) => console.log('statesssss', state) || state.movies;

export const getGenres = (state: State ) => state.genres;

export const apiStatus = (state: State) => state.api;

export const getUser = (state: State) => state.user;

export const getUserMovies = () => createSelector (
	getUser,
	(user) => {
		let { favs, watchList } = user.movies;
		return {
			...user,
			movies: {
				...user.movies,
				favIds: [
					...user.movies.favIds,
					...favs.results.map(movie=>movie.id)
				],
				watchIds: [
					...user.movies.watchIds,
					...watchList.results.map(movie=>movie.id)
				]
			}
		}
	}
)

export const getSearchedMovies = (state: State) => state.searchedMovies;