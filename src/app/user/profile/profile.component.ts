import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { IStore, IProfile, IUserMovies, IMovie } from './../../shared/dataModels/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-user-profile',
  template: `
  <div class="user-profile">
    <div class="container">
      <div class="logo">
        <span>K</span>
      </div>
      <ul>
        <li>kay21</li>
      </ul>
    </div>
  </div>
  <tabs>
    <tab [tabTitle]=" 'Favorites ('+ favMovies.total_results +')' ">
      <app-movie-list
        userView= 'favorite'
        [userMovies]= 'userMovies'
        [movies]='favMovies.results'
        (onEditlist)="onEditList($event)">
      </app-movie-list>
    </tab>
    <tab [tabTitle]=" 'Watch List ('+ watchListMovies.total_results +')' ">
      <app-movie-list
        userView= 'watchList'
        [userMovies]= 'userMovies'
        [movies]='watchListMovies.results'
        (onEditlist)="onEditList($event)">
      </app-movie-list>
    </tab>
  </tabs>
  `,
  // templateUrl: './nav-bar.component.html',
  styles: [`
    .container div {
      float: left;
    }
    .logo span{
      padding: 30px;
      background: #000;
      border-radius: 67px;
      font-size: 2.5rem;
      color: #ff5c00;
      display: inline-block;
      width: 116px;
      text-align: center;
      margin-right: 4rem;
    }
    .user-profile {
      background: #eaeaea;
      height: 150px;
      padding-top: 12px;
    }
    .user-profile ul {
      overflow: hidden;
      padding-top: 24px;
    }
    .user-profile ul li {
      color: #ff5c00;
      list-style: none;
      border-left: 1px solid #ccc;
      padding: 16px;
      font-size: 2rem;
    }
  `]
})
export class ProfileComponent implements IProfile{
  sub: any;
  userMovies: IUserMovies;
  favMovies: IMovie[];
  watchListMovies: IMovie[];
  private ngOnDestroy$ = new Subject<void>();

  constructor (private authSvc: AuthService, private store: Store<IStore>, private route: ActivatedRoute) {
    this.sub = this.store.select('userMovies')
    .takeUntil(this.ngOnDestroy$)
    .subscribe((state: any) => {
      let {favs, watchList} = state;
      this.userMovies = state;
      this.favMovies = favs;
      this.watchListMovies = watchList;
    });
  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(null);
  }
  public onEditList(data) { console.log('data', data)
    this.authSvc.markFav(data, true);
  }
}
