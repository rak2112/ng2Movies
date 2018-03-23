import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../core/services/index';

// import { IGenres } from '../../core/models';

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

	@Input() userView: string;
  @Input() user;
  @Input() movieData: any = {};
  @Input() public genres: any = [];
  @Input() public selectedGenres: Array<string> = [];
  @Output() editFavList: EventEmitter<any> = new EventEmitter<any>();
	
  constructor(private _utilService: UtilService) {}


  ngOnInit() {
		let { userId, movies:{favIds, watchIds} } = this.user;
    this.getGenres();
    if(userId) {
      this.isFav = favIds.includes(this.movieData.id);
      this.isWatchList = watchIds.includes(this.movieData.id);
    }
  }

  getGenres() {
		let movieGenre = this.movieData.genre_ids;
    this.movieGenres = this._utilService.getMovieGenres(movieGenre, this.genres, this.selectedGenres);
  }
  public onMarkAsFav(event, data): void {
    this.isFav = (this.user.userId) ? !this.isFav : this.isFav
    //this.isFav = !this.isFav;
    data.favorite = this.isFav;
    event.preventDefault();
    this.editFavList.emit(data);
  }
  public onAddToList(event, data): void {
    this.isWatchList = (this.user.userId) ? !this.isWatchList: this.isWatchList;
    data.includeInWatch = this.isWatchList;
    data.watchList = true;
    event.preventDefault();
    this.editFavList.emit(data);
  }

}
