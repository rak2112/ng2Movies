import { 
	UsersEntitiesAction as UserEntities,
	TRY_LOG_IN,
	USER_LOGIN_SUCCESS,
	USER_MOVIES_LIST_SUCCESS,
	ADD_TO_FAVS_SUCCESS,
	REMOVE_FAVS_SUCCESS
} from './../../core/actions';
import { IUser } from './../models';


const selectedMovies = {
	hasUserCredentials: false,
	userName: null,
	userId: null,
	sessionId: null,
	movies: {
		exists: false,
		favIds: [],
		watchIds: [],
		favs: {results:[], total_results: 0},
		watchList: {results:[], total_results: 0}
	}
};


export const user = (state: IUser = selectedMovies, action: UserEntities ) => { console.log(';action', action);
	switch (action.type) {
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				hasUserCredentials: true,
				sessionId: action.payload.sessionId,
				userId: action.payload.id,
				userName: action.payload.username
			}
		case USER_MOVIES_LIST_SUCCESS:
			return {
				...state,
				movies: {
					...state.movies,
					exists: true,
					favs: action.payload[0],
					watchList: action.payload[1]
				}
			}
		case ADD_TO_FAVS_SUCCESS:
			return {
				...state,
				movies: {
					...state.movies,
					favIds: [...state.movies.favIds, action.payload.id]
				}
			}
		case REMOVE_FAVS_SUCCESS:
			return {
				...state,
				movies: {
					...state.movies,
					favIds: state.movies.favIds.filter((elem)=> elem !== action.payload.id)
				}
			}	
		default:
		 return state;
	}
};

// export function users(state: IUser = selectedMovies, action) {
//   switch (action.type) {
//     case 'LOADED_USER_LIST':
//       return Object.assign({}, state, {
//         userId: action.payload[4].userId,
//         favs: action.payload[0],
//         watchList: action.payload[1],
//         favIds: action.payload[2].favIds,
//         watchIds: action.payload[3].watchIds
//       });
//     case 'REMOVE_FROM_FAVS':
//       return Object.assign({}, state, {
//         favs: Object.assign({}, state.favs, {
//           results: state.favs.results.filter((movie, index)=> movie.id !== action.payload),
//           total_results: state.favs.total_results-1
//         })
//     });
//     case 'REMOVE_FROM_WATCHLIST':
//       return Object.assign({}, state, {
//         watchList: Object.assign({}, state.watchList, {
//           results: state.watchList.results.filter((movie, index)=> movie.id !== action.payload),
//           total_results: state.watchList.total_results-1
//         })
//       });
//     case 'NO_USER_LOGGED':
//       return selectedMovies;
//     default:
//       return state;

//   }
// }
