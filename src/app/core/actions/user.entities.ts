import { Action } from '@ngrx/store';

export const TRY_LOG_IN = '[userMovies] try user login';
export const USER_LOGIN_SUCCESS = '[userMovies] user login success';
export const USER_MOVIES_LIST_SUCCESS = '[userMovies] load user movies success';
export const NO_USER_LOGGED = '[userMovies] user not logged';

export const EDIT_FAVS = "[userMovies] edit favorites";
export const ADD_TO_FAVS_SUCCESS = "[userMovies] add to favorites success";
export const REMOVE_FAVS_SUCCESS = "[userMovies] remove favorites success";

export const EDIT_WATCHLIST = "[userMovies] add to watch list";
export const ADD_WATCHLIST_SUUCESS = "[userMovies] add to watch list success";
export const REMOVE_WATCHLIST_SUUCESS = "[userMovies] remove watch list success";



export class TryLogIn implements Action {
	readonly type = TRY_LOG_IN;
    
	constructor(public payload: any) {}
}

export class UserLoginSuccess implements Action {
	readonly type = USER_LOGIN_SUCCESS;
    
	constructor(public payload) {}
}

export class LoadUserMoviesSuccess implements Action {
	readonly type = USER_MOVIES_LIST_SUCCESS;
    
	constructor(public payload) {}
}

export class EditFavs implements Action {
	readonly type = EDIT_FAVS;
	constructor(public payload) {}
}

export class AddToFavs implements Action {
	readonly type = ADD_TO_FAVS_SUCCESS;
	constructor(public payload) {}
}

export class AddToWatchList implements Action {
	readonly type = ADD_WATCHLIST_SUUCESS;
    
	constructor(public payload) {}
}

export class RemoveFromFavs implements Action {
	readonly type = REMOVE_FAVS_SUCCESS;
	constructor(public payload) {}
}

export class RemoveFromWatchList implements Action {
	readonly type = REMOVE_WATCHLIST_SUUCESS;
    
	constructor(public payload) {}
}

export class NoUserLogged implements Action {
	readonly type = NO_USER_LOGGED;

	constructor(public payload) {}
}

export type UsersEntitiesAction = 
| TryLogIn
| UserLoginSuccess
| LoadUserMoviesSuccess
| AddToFavs
| RemoveFromFavs
| AddToWatchList
| RemoveFromWatchList
| NoUserLogged;
