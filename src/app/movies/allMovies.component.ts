// import { Component, OnInit, OnChanges } from '@angular/core';
// import { ActivatedRoute, Params }   from '@angular/router';
// import { Location }                 from '@angular/common';
// import { AuthService } from './../user/auth.service';
// import { Store } from '@ngrx/store';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/takeUntil';
// import { IMovies, IStore } from '../core/models/index';
// import { MovieService } from '../core/services/movie.service';
// import { State } from './../core/reducers';
// import { getMovies, getUserMovies } from './../core/selectors';
// @Component({
//   selector: 'all-movies',
//   // templateUrl: './allMovies.component.html',
//   // styleUrls: ['./allMovies.component.scss']
// })
// export class AllMovies implements IMovies {
//   movies: any = [];
//   pageNo: number = 1;
//   collectionSize: number;
//   isFetching: boolean;
//   hasError: boolean;
//   errorStatus: string;
//   currentRoute: string;
//   sub: any;
//   subUserSelection: any;
//   filters: any;
//   selectedFilters: {};
// 	userMovies$: any;
// 	allMovies$: any;
//   private ngOnDestroy$ = new Subject<void>();
//   private userStatus$ = new Subject<void>();

//   constructor(
//       private _movieService: MovieService,
//       private authSvc: AuthService,
//       private route: ActivatedRoute,
//       private location: Location,
//       private store: Store<State>) {

//     this.userMovies$ = store.select(getUserMovies);
//     this.allMovies$ = store.select(getMovies);
//       // .takeUntil(this.ngOnDestroy$)
//       // .subscribe((state: IMovies) => {
//       //   let {isFetching, hasError, errorStatus, pageNo, movies, collectionSize, filters, selectedFilters} = state;
//       //   this.isFetching = isFetching;
//       //   this.hasError = hasError;
//       //   this.errorStatus = errorStatus;
//       //   this.pageNo = pageNo;
//       //   this.movies = movies;
//       //   this.collectionSize = collectionSize;
//       //   this.filters = filters;
//       //   this.selectedFilters = selectedFilters;
//       // });
//   }

//   ngOnInit(): void {
//     this.currentRoute = this.location.path().split('/')[1];
//     this.onPageLoad();
//   }

//   ngOnChanges() {
//     console.log('changing nowww');
//   }

//   ngOnDestroy(): void {
//     this.ngOnDestroy$.next(null);
//   }

//   public onPageLoad(pageNo: number = 1): void {
//     this._movieService.getMovies(pageNo, this.currentRoute);
//   }

//   public onPageChange(page: number): void {
//     this.store.dispatch({type:'RESET_LOADER'});
//     this.onPageLoad(page);
//   }

//   public onFilterChange(item: any): void {
//     this._movieService.dispatchFilters(item, this.currentRoute, 1);
//   }

//   public onRemoveSelection(item: any): void {
//     item.type = 'remove_genres';
//     this._movieService.dispatchFilters(item, this.currentRoute, 1);
//   }

//   public onEditlist(data) {
//     this.authSvc.markFav(data, null);
//   }
// }
