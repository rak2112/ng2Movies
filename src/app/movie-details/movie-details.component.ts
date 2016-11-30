import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { MovieService } from './../services/movie.service';
import { ModalComponent } from './../shared/modal/modal.component';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  details: {};
  videos: Array<{}>;
  images: Array<{}>;
  cast: Array<{}>;
  crew: Array<{}>;
  loaded: boolean;
  closeResult: string;
  constructor(private _movieSvc: MovieService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.params
    .switchMap((params: Params) => this._movieSvc.getMovieDetails(+params['id']))
    .subscribe(res => {
      console.log('resss', res);
      this.loaded = true;
      this.details = res[0];
      this.videos = res[1].results;
      this.images = res[2];
      this.cast = res[3].cast;
      this.crew = res[3].crew;
    });
  }

  openModal(videoKey) {
    console.log('opened', videoKey);
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.videoKey = videoKey;
  }

}
