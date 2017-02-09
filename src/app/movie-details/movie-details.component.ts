import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { MovieService } from './../services/movie.service';
import { ModalComponent } from './../shared/modal/modal.component';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

interface MovieDetailState {
  isFetching: boolean,
  hasError: boolean,
  errorDetails: {},
  details: {
    movieDetails:{}
  },
  openModal(videoKey: String): void
}

interface AppStore {
  movies:{},
  movieDetails: {}
}


@Component({
  selector: 'app-movie-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements MovieDetailState {
  details: {movieDetails:{}};
  isFetching: boolean;
  hasError: boolean;
  errorDetails: {};
  videos: Array<{}>;
  images: Array<{}>;
  cast: Array<{}>;
  crew: Array<{}>;
  loaded: boolean;
  closeResult: string;
  constructor(
    private location: Location,
    private _movieSvc: MovieService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private store:Store<AppStore>) {
      store.select('movieDetailReducer')
        .subscribe((state: MovieDetailState) => {
          let {isFetching, hasError, errorDetails, details} = state;
          this.isFetching = isFetching;
          this.hasError = hasError;
          this.errorDetails = errorDetails;
          this.details = details;
        });
    }

  ngOnInit(): void {

    // this.route.params
    // .switchMap((params: Params) => this._movieSvc.getMovieDetails(+params['id']))
    // .subscribe((res) => {
    //   console.log('ress here', res);
    // });

    this.route.params
    .map((params: Params) => +params['id'])
      .subscribe((id) =>{
        this._movieSvc.getMovieDetails(id);
      });
  }

  ngOnDestroy() {
    this.store.dispatch({type:'RESET_LOADER'}); //reset the loader on exit.
  }

  openModal(videoKey) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.videoKey = videoKey;
  }

}
