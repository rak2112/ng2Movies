import { ActionReducer, Action } from '@ngrx/store';
import { MovieService } from './../services/movie.service';

// class someSvc {
//   super();
//   constructor(private movieSvc: MovieService) {
//
//   }
// }
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

export function movieReducer ( state = initialStateMovies, action) {
  // let some = new someSvc(); console.log('someee', some)
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
  hasError: false,
  errorDetails: false,
  isFetching:true,
  showModal:false,
  utubeKey:null,
  details:{
    movieDetails:{},
    videos:[],
    cast:[],
    crew:[],
    images:[]

  }
};

export function movieDetailReducer ( state = initialStateDetails, action) {
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
        default :
            return state;
    }
}
