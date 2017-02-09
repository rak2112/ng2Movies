import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from './../../services/util.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movieGenres: any = [];
  constructor(private _utilService: UtilService) {}
  @Input() movieData: any = {};
  @Input() genres: any = [];
  @Input() public selectedGenres: Array<string> = [];

  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    let movieGenre = this.movieData.genre_ids;
    this.movieGenres = this._utilService.getMovieGenres(movieGenre, this.genres, this.selectedGenres);
  }
}
