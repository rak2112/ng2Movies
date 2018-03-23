import {
	ApiAction,
	API_LOAD_START,
	API_LOAD_END,
	API_ERROR
} from './../actions';

import { IApi } from './../models/index';

export type ApiState = IApi;
const initialApiState = {
	hasError: false,
  loading: false,
  errorStatus: ''
}

export function apiReducer ( state : IApi = initialApiState, action: ApiAction) {
  if(action.type === API_LOAD_START) {
    return {
      ...state,
      loading: true
    }
	}
	
	if(action.type === API_LOAD_END) {
    return {
      ...state,
      loading: false
    }
  }

  if(action.type === API_ERROR) {
    return {
			...state,
			loading: false,
			hasError: true,
      errorStatus: action.errorStatus
    }
	}
	return state;
}
