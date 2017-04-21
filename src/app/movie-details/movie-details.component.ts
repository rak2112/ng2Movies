import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { MovieService } from './../shared/services/movie.service';
import { IStore, IDetails } from './../shared/dataModels/index';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MovieDetailsComponent implements IDetails {
  details: {movieDetails:{}};
  isFetching: boolean;
  hasError: boolean;
  errorDetails: {};

  private ngOnDestroy$ = new Subject<void>();
  constructor(
    private location: Location,
    private _movieSvc: MovieService,
    private route: ActivatedRoute,
    private store:Store<IStore>) {
      store.select('movieDetail')
        .takeUntil(this.ngOnDestroy$)
        .subscribe((state: IDetails) => {
          let {isFetching, hasError, errorDetails, details} = state;
          this.isFetching = isFetching;
          this.hasError = hasError;
          this.errorDetails = errorDetails;
          this.details = details;
        });
    }

  ngOnInit(): void {
    this.route.params
    .map((params: Params) => +params['id'])
      .subscribe((id) =>{
        this._movieSvc.getMovieDetails(id);
      });
  }

  ngOnDestroy() {
    this.store.dispatch({type:'RESET_LOADER'}); //reset the loader on exit.
    this.ngOnDestroy$.next(null);
  }
}
