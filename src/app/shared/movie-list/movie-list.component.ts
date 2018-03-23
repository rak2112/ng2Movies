import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, Renderer, ElementRef } from '@angular/core';
import { MovieComponent } from './../movie/movie.component';
import { IMovie, IGenre, IMSelector } from '../../core/models/index';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {

  @ViewChild('moviesTop') movieTop: ElementRef;
  @Input() user;
  @Input() movies: IMovie[];
	@Input() userView: string;
	@Input() genres = [];
	@Input() selectedFilters = [];


  @Output() onEditlist: EventEmitter<any> = new EventEmitter<any>();
  constructor(private renderer: Renderer) {
		//this.selectedGenres = movies.filters.
	}

  public onEditFavList(data) :void {
    this.onEditlist.emit(data);
  }
}
