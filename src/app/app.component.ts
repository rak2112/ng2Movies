import { Component } from '@angular/core';
import { MovieService } from './services/movie.service';
import { Router }   from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title : string = 'app works now!';
  movie: string = '';
  movies: any = {};
  //movie : string ='';
  constructor(private movieService: MovieService, private router: Router){
    router.events.subscribe(val=> this.movie = ''); //resetting the search..
  }

  onChange(movieName: string = 'movie'): void {
    console.log('name is', movieName);
    this.movieService.searchMovies(movieName)
      .subscribe((res)=>{
        console.log('ressss', res);
        this.movies = res;
      },
    (error) =>{
      console.log('errror');
      this.movies = [];
    });
  }

  onSelectMovie(id: number): void {
    console.log('id', id);
    this.movies=[];
  }

  public onFocusOut(): void {
    this.movies = [];
  }
}
