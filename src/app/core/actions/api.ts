import { Action } from '@ngrx/store';

export const API_LOAD_START = '[api] load start';
export const API_LOAD_END = '[api] load end';
export const API_ERROR = '[api] load error';

export class StartLoader implements Action {
	readonly type = API_LOAD_START;

	constructor(){}
}

export class StopLoader implements Action {
	readonly type = API_LOAD_END;

	constructor(){}
}

export class ApiError implements Action {
	readonly type = API_ERROR;

	constructor(
		public errorStatus: {}
	){}
}

export type ApiAction =
| StartLoader
| StopLoader
| ApiError;
