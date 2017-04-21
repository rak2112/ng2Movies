import { ActionReducer, Action } from '@ngrx/store';

let currentYear = new Date().getFullYear();
const initialStateMovies = {
  isFetching:true,
  hasError: false,
  pageNo:1,
  collectionSize:20,
  movies:[],
  genres:[],
  errorStatus:{},
  filters: {
    years: [
      {id:null, name: 'None', type: 'years'},
      {id:currentYear, name: currentYear, type: 'years'},
      {id:currentYear-1, name: currentYear-1, type: 'years'},
      {id:currentYear-2, name: currentYear-2, type: 'years'},
      {id:currentYear-3, name: currentYear-3, type: 'years'}
    ],
    otherFilters: [
      {id:null, name: 'None', type: 'otherFilters'},
      {id:'primary_release_date.asc', name: 'Releae Date Asc', type: 'otherFilters'},
      {id:'primary_release_date.desc', name: 'Releae Date Desc', type: 'otherFilters'}
    ],
    genres:[]
  },
  selectedFilters: {
    years: {},
    otherFilters:{},
    multiSelectors: []
  }
};

// interface ActionReducer<T> {
//   (state: T, action: Action)
// }

export function movies ( state = initialStateMovies, action) {
  switch (action.type) {
        case 'RESET_LOADER':
            return Object.assign({}, state, {
              isFetching: true
            });
        case 'LOAD_ERROR':
            return Object.assign({}, state, {
              hasError: true,
              isFetching: false,
              errorStatus: action.payload
            });
        case 'FILTER_CHANGED_YEARS':
            return Object.assign({}, state, {
              selectedFilters: Object.assign({}, state.selectedFilters, {
                years: action.payload
              })
            });
        case 'FILTER_CHANGED_OTHERS':
            return Object.assign({}, state, {
              selectedFilters: Object.assign({}, state.selectedFilters, {
                otherFilters: action.payload
              })
            });
        case 'FILTER_ADD_MULTI':
              return Object.assign({}, state, {
                selectedFilters: Object.assign({}, state.selectedFilters, {
                  multiSelectors: (!state.selectedFilters.multiSelectors.find((i) => i === action.payload)) ? [...state.selectedFilters.multiSelectors, action.payload]: state.selectedFilters.multiSelectors
                })
              });
        case 'FILTER_REMOVE_MULTI':
              return Object.assign({}, state, {
                selectedFilters: Object.assign({}, state.selectedFilters, {
                  multiSelectors: [...state.selectedFilters.multiSelectors.slice(0, action.payload.index), ...state.selectedFilters.multiSelectors.slice(action.payload.index + 1)]
                })
              });
        case 'LOAD_SUCCESS':
            return Object.assign({}, state, {
              isFetching: false,
              hasError: false,
              pageNo: action.payload[0].page,
              collectionSize : (action.payload[0].total_results > 200000) ? 19980 : action.payload[0].total_results, //api doesnt support more than 200,000 collectionSize
              movies: action.payload[0].results,
              filters: Object.assign({}, state.filters, {
                genres: action.payload[1].genres
              })//action.payload[1]
          });
        default :
            return state;
    }
}

const initialStateDetails = {
  isFetching:true,
  hasError: false,
  errorDetails: false,
  details:{
    movieDetails:{},
    videos:[],
    cast:[],
    crew:[],
    images:[]

  }
};

export function movieDetail ( state = initialStateDetails, action) {
    switch (action.type) {
        case 'RESET_LOADER':
          return Object.assign({}, state, {
            isFetching: true
          });
        case 'ERROR_DETAILS':
          return Object.assign({}, state, {
            hasError: true,
            isFetching: false,
            errorDetails: action.payload
          });
        case 'DETAILS_LOADED':
          return Object.assign({}, state, {
            isFetching: false,
            hasError: false,
            details: action.payload
          });
        default:
          return state;
    }
}

const moviesFound = {
  movies: [],
  movie: null
}

export function searchedMovies(state = moviesFound, action) {
  switch(action.type) {
    case 'TRIDGGER_SEARCH':
      return Object.assign({}, state, {
        movie: action.payload.movie,
        movies: action.payload.movies
      });
    case 'RESET_SEARCH':
      return moviesFound;
    default:
      return moviesFound;

  }
}

const auth = {
  hasAuth: false,
  sessionId: null,
  userId: null,
  userName: null,
}

export function authenticateUser(state = auth, action) {
  switch(action.type) {
    case 'USER_AUTHENTICATED':
      return Object.assign({}, state, {
        hasAuth: true,
        sessionId: action.payload.sessionId,
        userId: action.payload.id,
        userName: action.payload.username
      });
    case 'USER_LOGGED':
      return Object.assign({}, state, {
        hasAuth: true
      });
    case 'USER_LOGGED_OUT':
      return auth;
    default:
      return state;

  }
}

const selectedMovies = {
  favIds: [],
  watchIds: [],
  favs: {},
  watchList: {}
};
export function userMovies(state= selectedMovies, action) {
  switch (action.type) {
    case 'LOADED_USER_LIST':
      return Object.assign({}, state, {
        favs: action.payload[0],
        watchList: action.payload[1],
        favIds: action.payload.favIds,
        watchIds: action.payload.watchIds
      });
    default:
      return state;

  }
}
