import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { MovieService } from './../services/movie.service';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


interface MoviesState {
  title: string,
  isFetching: boolean,
  hasError: boolean,
  pageNo: number,
  collectionSize: number,
  genres: any[],
  movies: any[],
  errorStatus: string,
  currentRoute: string,
  sub: any;
  filters: any;
  selectedFilters: {};
  onPageLoad(pageNo: number): void,
  onPageChange(page: number): void
}

interface AppStore {
  movies:{}
}

@Component({
  selector: 'all-movies',
  templateUrl: './allMovies.component.html',
  styleUrls: ['./allMovies.component.scss']
})
export class AllMovies implements MoviesState {
  title: string = 'All Movies';
  movies: any = [];
  genres: any = [];
  pageNo: number = 1;
  collectionSize: number;
  isFetching: boolean;
  hasError: boolean;
  errorStatus: string;
  currentRoute: string;
  sub: any;
  filters: any;
  selectedFilters: {};

  private ngOnDestroy$ = new Subject<void>();
  private filterChanged = new Subject<void>();

  constructor(
      private _movieService: MovieService,
      private route: ActivatedRoute,
      private location: Location,
      private store: Store<AppStore>) {


    this.sub = store.select('movieReducer')
      .takeUntil(this.ngOnDestroy$)
      .subscribe((state: MoviesState) => {
        let {isFetching, hasError, pageNo, movies, collectionSize, genres, errorStatus, filters, selectedFilters} = state;
        this.isFetching = isFetching;
        this.hasError = hasError;
        this.errorStatus = errorStatus;
        this.pageNo = pageNo;
        this.movies = movies;
        this.collectionSize = collectionSize;
        this.filters = filters;
        this.selectedFilters = selectedFilters;
      });
  }

  ngOnInit(): void {
    this.currentRoute = this.location.path().split('/')[1];
    this.onPageLoad();
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(null);
  }

  public onPageLoad(pageNo: number = 1) : void {
    this._movieService.getMovies(pageNo, this.currentRoute);
  }

  public onPageChange(page: number) : void {
    this.store.dispatch({type:'RESET_LOADER'});
    this.onPageLoad(page);
  }

  public onFilterChange(item) : void {
    this._movieService.dispatchFilters(item, this.currentRoute, 1);
      //this.filterChanged.next(this.selectedFilters);
  }

  public onRemoveSelection(item): void {
    item.type = 'remove_genres';
    this._movieService.dispatchFilters(item, this.currentRoute, 1);
  }
}
