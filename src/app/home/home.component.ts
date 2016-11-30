import { Component, OnInit } from '@angular/core';
import { MovieService } from './../services/movie.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class Home implements OnInit {

  posters: Array<{}>;
  constructor (private movieService: MovieService) {}

  ngOnInit(): void {
  }
}
