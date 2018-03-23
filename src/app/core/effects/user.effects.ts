import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Action } from '@ngrx/store';
import { catchError, map, tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../../user/auth.service';
import * as userEntities from '../actions/user.entities';
import * as api from '../actions/api';

@Injectable()
export class UserEffects {

	@Effect()
	tryUserLogin$ = this.actions$.ofType(userEntities.TRY_LOG_IN)
	.pipe(
		map((action: userEntities.TryLogIn) => action.payload),
		switchMap((payload)=> this.authService.getNewToken(payload)),
		switchMap(({session_id: sessionId}) => {
			return this.authService.authenticateUser(sessionId)
			.map((res) => new userEntities.UserLoginSuccess(res))
		}),
    catchError(err => of(new api.ApiError(err)))
	)

	@Effect()
	editFavoriteList$ = this.actions$.ofType(userEntities.EDIT_FAVS)
	.pipe(
		map((action: userEntities.EditFavs) => action.payload),
		switchMap((payload)=> { console.log('pa.oaddddd', payload);
			return this.authService.editFavorites(payload)
							.pipe(
								map((res) => {
									let { favorite } = payload;
									console.log('resss', res);
									return (favorite) ? new userEntities.AddToFavs(payload) : new userEntities.RemoveFromFavs(payload)
								})
							)
		}),
    catchError(err => of(new api.ApiError(err)))
	)
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
