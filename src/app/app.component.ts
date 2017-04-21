import { Component } from '@angular/core';
import { MovieService } from './shared/services/movie.service';
import { AuthService } from './user/auth.service';
import { ISearch, IStore } from './shared/dataModels/index';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Router, NavigationEnd }   from '@angular/router';


interface IUserDetail {
  hasAuth: boolean,
  sessionId: string,
  userId: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  moviesFound$: Observable<ISearch>;
  userDetail$: Observable<ISearch>;
  constructor(
      private movieService: MovieService,
      private router: Router,
      private authSvc: AuthService,
      private store: Store<IStore>) {
        this.moviesFound$ = this.store.select('searchedMovies');
        this.userDetail$ = this.store.select('authenticateUser');
  }

  ngOnInit() {
    this.authSvc.getUser();
  }

  onChange(movieName: string): void {
    this.movieService.searchMovies(movieName);
  }

  resetState(): void {
    this.store.dispatch({type: 'RESET_SEARCH'});
  }
  onLogOut(event): void {
    event.preventDefault();
    this.authSvc.logOut();
    this.router.navigate(['home']);
  }
}
