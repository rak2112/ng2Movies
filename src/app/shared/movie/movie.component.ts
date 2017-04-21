import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from './../services/util.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movieGenres: any = [];
  isFav: boolean = false;
  isInWatch: boolean = false;
  isWatchList: boolean = false;
  constructor(private _utilService: UtilService) {}
  @Input() userView: boolean;
  @Input() movieData: any = {};
  @Input() genres: any = [];
  @Input() public selectedGenres: Array<string> = [];
  @Output() editFavList: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    let movieGenre = this.movieData.genre_ids;
    this.movieGenres = this._utilService.getMovieGenres(movieGenre, this.genres, this.selectedGenres);
  }
  public onMarkAsFav(event, data): void {
    this.isFav = !this.isFav;
    data.favorite = this.isFav;
    event.preventDefault();
    this.editFavList.emit(data);
  }
  public onAddToList(event, data): void {
    this.isWatchList = !this.isWatchList;
    data.includeInWatch = this.isWatchList;
    data.watchList = true;
    event.preventDefault();
    this.editFavList.emit(data);
  }

}
