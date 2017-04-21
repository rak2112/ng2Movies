export interface IStore {
  movies: {},
  movieDetails:{},
  searchedMovies:{}
}

export interface IFilters {
  genres: IGenre[],
  otherFilters: IOtherFilters[],
  years: IOtherFilters[]
}

export interface ISelectedFilters {
  multiSelectors?: IMSelector[],
  otherFilters?: IOtherFilters[],
  years?: IOtherFilters[]
}

export interface IMSelector {
  id: number,
  name: string
}

export interface IOtherFilters {
  id?: number,
  name: string,
  type: string
}

export interface IGenre {
  id: string,
  name: string
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

export interface IUserMovies {
  sub: any;
  favTitle: string;
  favMovies: IMovie[];
  watchListTitle: string;
  watchListMovies: IMovie[];
}

export interface IMovies {
  isFetching: boolean,
  hasError: boolean,
  pageNo: number,
  errorStatus: string,
  currentRoute: string,
  collectionSize: number,
  movies: IMovie[],
  sub: any;
  filters: any;
  selectedFilters: {};
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
