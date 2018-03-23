import { ActionReducer, Action } from '@ngrx/store';
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

