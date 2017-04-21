import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, Renderer, ElementRef } from '@angular/core';
import { MovieComponent } from './../movie/movie.component';
import { IMovie, IMSelector, IGenre } from './../dataModels/index';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {

  @ViewChild('moviesTop') movieTop: ElementRef;
  @Input() public movies: IMovie[];
  @Input() public genres: IGenre[];
  @Input() public selectedGenres: IMSelector[];
  @Input() public userView: boolean;

  @Output() onEditlist: EventEmitter<any> = new EventEmitter<any>();
  constructor(private renderer: Renderer) {}

  ngOnChanges() { console.log('list changessss');
    this.renderer.setElementProperty(this.movieTop.nativeElement, 'scrollTop', 0);
  }

  public onEditFavList(data) :void {
    this.onEditlist.emit(data);
  }
}
