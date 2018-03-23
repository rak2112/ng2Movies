import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { getUserMovies } from '../../core/selectors';
import { IUser, IGenres,} from '../../core/models/index';

@Component({
  selector: 'profile-component',
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
    <tab [tabTitle]=" 'Favorites ('+ user.movies.favs.total_results +')' ">
      <app-movie-list
        userView= 'favorite'
				[user]= 'user'
				[genres] = "genres.all"
        [movies]='user.movies.favs.results'
        (onEditlist)="onEditList($event)">
      </app-movie-list>
    </tab>
    <tab [tabTitle]=" 'Watch List ('+ user.movies.watchList.total_results +')' ">
      <app-movie-list
        userView= 'watchList'
				[user]= "user"
				[genres] = "genres.all"
        [movies]='user.movies.watchList.results'
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
export class ProfileComponent {
	@Input() user: IUser;
	@Input() genres: IGenres;
	constructor(){}
}