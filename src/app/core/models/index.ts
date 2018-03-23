export interface IStore {
  movies: {},
  movieDetails:{},
  searchedMovies:{}
}

export interface IApi {
	hasError: boolean
  loading: boolean,
  errorStatus: {}
}

export interface ISelectedFilters {
  multiSelectors?: Array<any>,
  otherFilters?: {id?: number}
  years?: {id?: number}
}


export interface IMSelector {
  id?: number,
	name?: string,
	type?: string
}


export interface IFilterChange {
	currentFilter: IMSelector,
	selectedFilters: ISelectedFilters
}

export interface IFiltersPayload {
	currentRoute: string,
	pageNo: number,
	selectedFilter: ISelectedFilters
	currentFilter: IMSelector
}


export interface IYears {
	id: number,
	name: number,
	type: string
}
export interface IOtherFilters {
  id: string,
  name: string,
  type: string
}

export interface IGenre {
  id: string,
  name: string
}

export interface IGenres {
	all: IGenre[]
}

export interface IFilters {
	years: IYears[],
	otherFilters: IOtherFilters[],
  genres: IGenre[]
}

interface filterState {
  selectedFilters:{
    multiSelectors?: IMSelector[],
    otherFilters?: IOtherFilters,
    years?: IOtherFilters
  }
}

export interface IMovie {
  id: number,
  backdrop_path?: string,
  original_title?: string,
  overview?: string,
  genre_ids?: number[],
  poster_path?: string,
  release_date?: string,
  title?: string,
  vote_average?: number,
}

export interface IApp {
  //moviesFound$: Observable,
  onChange(movieName: string): void,
  resetSelection(): void
}
export interface ISearch {
	//apiStatus: IApi,
  movie: string,
  movies: IMovie[],

}

export interface ILogin {
  hasAuth: boolean;
  userDetail$: any;
}

export interface IUserDetail {
  hasAuth: boolean,
  sessionId: string,
  userId: string
}

export interface favWatchList {
	id: number
}

export interface IUser {
	hasUserCredentials?: boolean,
	userName?: string,
	sessionId?: string,
	userId?: number,
	movies?: {
		exists: boolean,
		favIds: Array<number>,
		watchIds: Array<number>,
		favs: {
			results: favWatchList[],
			total_results: number
		},
		watchList: {
			results: favWatchList[],
			total_results: number
		}
	}
}
export interface IUserMovies {
	movies: {
		exists: boolean,
		favIds: Array<number>,
		watchIds: Array<number>,
		favs: {
			results: favWatchList[],
			total_results: number
		},
		watchList: {
			results: favWatchList[],
			total_results: number
		}
	}
}

export interface IProfile {
  favMovies: IMovie[];
  watchListMovies: IMovie[];
}

export interface IMovies {
  hasError: boolean,
  pageNo: number,
  errorStatus: {},
  currentRoute: string,
  collectionSize: number,
	movies: IMovie[],
	genres: IGenre[],
  filters: IFilters;
  selectedFilters: ISelectedFilters;
  onPageLoad(pageNo: number): void,
  onPageChange(page: number): void
}

export interface IDetails {
  isFetching: boolean,
  hasError: boolean,
  errorDetails: {},
  details: {
    movieDetails:{}
  }
}

let currentYear = new Date().getFullYear();
export const initialMovieState = {
  isFetching:true,
  hasError: false,
  pageNo:1,
	collectionSize:20,
	currentRoute: '',
  movies:[],
  genres:[],
  errorStatus:{},
  filters: {
    years: [
      {id:currentYear, name: currentYear, type: 'years'},
      {id:currentYear-1, name: currentYear-1, type: 'years'},
      {id:currentYear-2, name: currentYear-2, type: 'years'},
      {id:currentYear-3, name: currentYear-3, type: 'years'}
    ],
    otherFilters: [
      {id:'', name: 'None', type: 'otherFilters'},
      {id:'primary_release_date.asc', name: 'Releae Date Asc', type: 'otherFilters'},
      {id:'primary_release_date.desc', name: 'Releae Date Desc', type: 'otherFilters'}
    ],
    genres:[{id: '1', name: 'default'}]
  },
  selectedFilters: {
    years: {},
    otherFilters:{},
    multiSelectors: []
	},
	onPageLoad: ()=>{},
	onPageChange: ()=>{}
};
