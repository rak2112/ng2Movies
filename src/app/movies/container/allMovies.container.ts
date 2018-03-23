import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './../../user/auth.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IMovies, IApi, IStore, IGenres, IUserMovies } from '../../core/models/index';
import { MovieService } from '../../core/services/movie.service';


import { State } from './../../core/reducers';
import * as moviesEntities from './../../core/actions';
import { getMovies, apiStatus, getUserMovies, getGenres } from './../../core/selectors';


@Component({
  selector: 'all-movies',
	template: `<app-movies
							[apiStatus] = "apiStatus$ | async"
 							[user] = "user$ | async"
							[movies]= "allMovies$ | async"
							[genres]= "genres$ | async"
							(onFilterChange)="onFilterChange($event)"
							(onRemoveSelection)="onRemoveSelection($event)"
							(onEditFavorites)="onEditFavorites($event)"
							(onEditWatchList)="onEditWatchList($event)"
              (selectedPage)= "onPageChange($event)">
						</app-movies>`,
})
export class AllMoviesContainer {
	currentRoute: string;
	user$: Observable<IUserMovies>;
	allMovies$: Observable<IMovies>;
	apiStatus$: Observable<IApi>;
	genres$: Observable<IGenres>;

  constructor(
			private movieService: MovieService,
			private authSvc: AuthService,
      private location: Location,
      private store: Store<State>) {
		
	  this.apiStatus$ = store.select(apiStatus);
		this.user$ = store.select(getUserMovies());
		this.allMovies$ = store.select(getMovies);
		this.genres$ = store.select(getGenres);
  }

  ngOnInit(): void {
    this.currentRoute = this.location.path().split('/')[1];
    this.onPageLoad();
  }

  onPageLoad(pageNo: number = 1): void {
		this.store.dispatch(new moviesEntities.LoadMovies({pageNo, currentRoute:this.currentRoute}));
	}
	

  onPageChange(filters): void {
    this.onFilterChange({ ...filters, currentRoute: this.currentRoute, currentFilter: {type: 'noCurrentFilter'}});
  }

	onFilterChange(filters: any): void {
		let { currentFilter, pageNo } = filters;
		let hasFilter = (this.movieService.dispatchFilters(currentFilter));
		(hasFilter) ? this.store.dispatch(new moviesEntities[hasFilter](currentFilter)) : null;
		this.store.dispatch(new moviesEntities.StartLoader());
		this.store.dispatch(new moviesEntities.filterChanged({...filters, currentRoute: this.currentRoute, pageNo}));
  }

  onRemoveSelection(filters: any): void {
    this.onFilterChange(filters);
  }

	onEditFavorites(data) { console.log('data', data);
		this.store.dispatch(new moviesEntities.EditFavs(data));
    //this.authSvc.editFavorites(data); //use an effect here...
	}
	onEditWatchList (data) { console.log('data in ', data);
		this.authSvc.editFavorites(data); //use an effect here...
	}
}
