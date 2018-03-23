import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { MovieService } from  '../../core/services';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { getUserMovies, getGenres } from '../../core/selectors';

import { State } from './../../core/reducers';
import { IProfile, IUser, IMovie, IStore, IGenres } from '../../core/models/index';

@Component({
  selector: 'user-profile',
	template: `<profile-component
							[genres] = "genre$ | async"
							[user] = "user$ | async">
						</profile-component>`
})
export class ProfileComponentContainer implements IProfile{
  sub: any;
	user$: any;
	genre$: any;
  favMovies: IMovie[];
  watchListMovies: IMovie[];
  private ngOnDestroy$ = new Subject<void>();

  constructor (private authSvc: AuthService, private movieService: MovieService, private store: Store<State>, private route: ActivatedRoute) {
		this.user$ = store.select(getUserMovies());
		this.genre$ = store.select(getGenres);

  }
  public onEditList(data) { console.log('data', data)
    this.authSvc.markFav(data, true);
  }
}
