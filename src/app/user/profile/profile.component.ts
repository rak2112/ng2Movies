import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { IStore, IUserMovies } from './../../shared/dataModels/index';
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
    <tab [tabTitle]='favTitle'>
      <app-movie-list
        [movies]='favMovies'
        [userView]=true
        (onEditlist)="onEditlist($event)">
      </app-movie-list>
    </tab>
    <tab [tabTitle]='watchListTitle'>
      <app-movie-list
        [movies]='watchListMovies'
        (onEditlist)="onEditlist($event)">
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
export class ProfileComponent implements IUserMovies{
  sub: any;
  favTitle: string;
  favMovies: any;
  watchListTitle: string;
  watchListMovies: any;
  favTotal: number;
  watchTotal: number;

  userSelection$: Observable<any>;
  private ngOnDestroy$ = new Subject<void>();
  constructor (private authSvc: AuthService, private store: Store<IStore>, private route: ActivatedRoute) {
    this.sub = this.store.select('userMovies')
    .takeUntil(this.ngOnDestroy$)
    .subscribe((state: any) => {
      let {favs, watchList} = state;
      this.favMovies = favs.results;
      this.favTitle = `Favorites (${favs.total_results})`;
      this.favTotal = favs.total_results;
      this.watchTotal = watchList.total_results;
      this.watchListMovies = watchList.results;
      this.watchListTitle = `Watch List (${watchList.total_results})`;
      console.log('state in store', state);
    });
  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(null);
  }
}
