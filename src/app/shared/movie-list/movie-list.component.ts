import { Component, OnInit, OnChanges, Input, ViewChild, Renderer, ElementRef } from '@angular/core';
import {MovieComponent} from './../movie/movie.component';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnChanges {

  @ViewChild('moviesTop') movieTop: ElementRef;
  @Input() public movies: Array<{}> = [];
  @Input() public genres: Array<string> = [];

  constructor(private renderer: Renderer) {}

  ngOnChanges() {
    console.log('changeme');
    this.renderer.setElementProperty(this.movieTop.nativeElement, 'scrollTop', 0);
  }
}
