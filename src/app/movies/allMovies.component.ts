import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { MovieService } from './../services/movie.service';


@Component({
  selector: 'all-movies',
  templateUrl: './allMovies.component.html',
  styleUrls: ['./allMovies.component.scss']
})
export class AllMovies implements OnInit {
  title: string = 'All Movies';
  movies: any = [];
  genres: any = [];
  pageNo: number = 1;
  collectionSize: number;
  totalPages: number;
  loaded: boolean;
  hasError: boolean;
  errorStatus: string;
  currentRoute: string;
  constructor(private _movieService: MovieService, private route: ActivatedRoute, private location: Location) {
    this.movies = [];
  }

  ngOnInit(): void {
    this.currentRoute = this.location.path().split('/')[1];
    this.onPageLoad();
  }

  private onPageLoad(pageNo: number = 1) : void {
    this._movieService.getMovies(pageNo, this.currentRoute)
      .subscribe((res) => {
        console.log('data', res);
        this.pageNo = res[0].page;
        this.collectionSize = (res[0].total_results > 200000) ? 19980 : res[0].total_results; //api doesnt support more than 200,000 collectionSize
        this.movies = res[0].results;
        this.loaded = true;
        this.genres = res[1].genres;
      },
      (error => {
        this.hasError = true;
        this.loaded = true;
        this.errorStatus = error;
      }));
  }

  public onPageChange(page: number) : void {
    this.onPageLoad(page);
  }
}
