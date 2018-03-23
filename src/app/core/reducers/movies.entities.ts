import {
	EntitiesAction as MoviesEntitiesAction,
	LOAD_GENRES_SUCESS,
	LOAD_MOVIES_SUCCESS,
	LOAD_MOVIES_ERROR,
	LOADING_MOVIES,
	LOAD_MOVIES_BY_YEAR,
	LOAD_MOVIES_BY_ORDER,
	LOAD_MOVIES_BY_ADDING_GENRES,
	LOAD_MOVIES_BY_REMOVING_GENRES,
	MOVIE_SEARCH_SUCCESS,
	RESET_SEARCH
} from './../actions';

import { IMovies, ISearch, IGenres, initialMovieState} from './../models/index';

export type Movies = IMovies;

export const moviesReducer = ( state : IMovies = initialMovieState, action: MoviesEntitiesAction) => {
	switch (action.type) {
		case LOADING_MOVIES:
			return {
				...state,
				isFetching: true
			}
		case LOAD_MOVIES_ERROR:
			return {
				...state,
				hasError: true,
				isFetching: false,
				errorStatus: action.errorStatus
			}
		case LOAD_MOVIES_BY_YEAR:
			return {
				...state,
				selectedFilters: {
					...state.selectedFilters,
					years: action.payload
				}
			}
		case LOAD_MOVIES_BY_ORDER:
			return {
				...state,
				selectedFilters: {
					...state.selectedFilters,
					otherFilters: action.payload
				}
			}
		case LOAD_MOVIES_BY_ADDING_GENRES:
			return {
				...state,
				selectedFilters: {
					...state.selectedFilters,
					multiSelectors: (!state.selectedFilters.multiSelectors.find((item) => item.id === action.payload.id)) ? [...state.selectedFilters.multiSelectors, action.payload]: state.selectedFilters.multiSelectors
				}
			}
		case LOAD_MOVIES_BY_REMOVING_GENRES:
			return {
				...state,
				selectedFilters: {
					...state.selectedFilters,
					multiSelectors: [...state.selectedFilters.multiSelectors.slice(0, action.payload.index), ...state.selectedFilters.multiSelectors.slice(action.payload.index + 1)]
				}
			}
		case LOAD_MOVIES_SUCCESS:
			return {
				...state,
				isFetching: false,
				hasError: false,
				pageNo: action.payload[0].page,
				collectionSize : (action.payload[0].total_results > 200000) ? 19980 : action.payload[0].total_results,
				movies: action.payload[0].results,
				filters: {
					...state.filters,
					genres: action.payload[1].genres
				}
			}
		default :
			return state;
		}
	}
	
	const genres = {
		all:[]
	};
	export const allGenres = (state: IGenres = genres, action: MoviesEntitiesAction) =>{
		if(action.type === LOAD_GENRES_SUCESS){
			return {
				...state,
				all: action.payload
			}
		}
		else {return state}
	}

	const moviesFound = {
		movie: '',
		movies: [],
	}
	export type SearchMovies = ISearch;
	export const searchedMovies = (state: ISearch = moviesFound, action: MoviesEntitiesAction) => {
		switch(action.type) {
			case MOVIE_SEARCH_SUCCESS:
				return {
					...state,
					movies: action.payload.movies
				}
			case RESET_SEARCH:
				return {
					...state,
					movie: '',
					movies: []
				}
			default:
				return moviesFound;
	
		}
	}