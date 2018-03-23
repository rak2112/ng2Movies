import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { forkJoin } from "rxjs/observable/forkJoin";
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { UINotification } from '../core/services/index';
import { paths } from '../core/services/locationPaths';
import { IUser } from '../core/models';


@Injectable()
export class AuthService {
  filters: any;
  state: any;
  currentUser: boolean = false;
  userCredentials: {id: null, sessionId: null};
  some$: Observable<any>;
	constructor(private http: HttpClient, private uiNotifications: UINotification, private store: Store<any>) {
  }

	public getNewToken(data) {
		return this.http.get(`${paths.apiUrl}/authentication/token/new${paths.apiKey}`)
		.pipe(
			mergeMap(({request_token}: {request_token: string}) : ObservableInput<any> => {
				return this.http.get(`${paths.apiUrl}/authentication/token/validate_with_login${paths.apiKey}&username=${data.userName}&password=${data.password}&request_token=${request_token}`)
				.pipe(
					mergeMap((res) => this.http.get(`${paths.apiUrl}/authentication/session/new${paths.apiKey}&request_token=${request_token}`))
				)
			})
		)
	}
  public authenticateUser(sessionId) { console.log('saesssion', sessionId)
			return this.http.get(`${paths.apiUrl}/account${paths.apiKey}&session_id=${sessionId}`)
			.pipe(
				mergeMap((res : {id: null, username: string, name: string}): Observable<any> => {
					localStorage.setItem('user', JSON.stringify({
						sessionId: sessionId,
						id: res.id,
						name: res.name,
						username: res.username
					}));
					return of({...res, sessionId});
				})
			)
  }

  public getUser() {
		const user = localStorage.getItem('user');
		return (user) ? JSON.parse(user) : null;
    // let sessionId = localStorage.getItem('sessionId');
    // this.http.get(`${paths.apiUrl}/account${paths.apiKey}&session_id=${sessionId}`)
    // .subscribe(res => { console.log('getuser',res);
    //   res.sessionId = sessionId;
    //   this.authUser(res);
    //   this.store.dispatch({type: 'USER_AUTHENTICATED', payload: res});
    // },
    // error=> {
    //   this.store.dispatch({type: 'USER_LOGGED_OUT'});
    // });
  }
  public authUser(userDetail): void {
    this.currentUser = true;
    this.userCredentials = userDetail;
  }
  public logOut(): void {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.currentUser = false;
    this.store.dispatch({type: 'USER_LOGGED_OUT'});
    this.store.dispatch({type: 'NO_USER_LOGGED'});
  }
  public hasAuth(): boolean {
    return this.currentUser;
  }
  public getAuthByStorage(): string {
    return localStorage.getItem('sessionId');
	}
	
	editFavorites({userId, sessionId, id, favorite}) {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
    return this.http.post(
      (`${paths.apiUrl}/account/${userId}/favorite${paths.apiKey}&session_id=${sessionId}`),
			JSON.stringify({media_type: 'movie', media_id: id, favorite: favorite}),
			httpOptions
    );
    // .subscribe(res => { console.log('resss in service....', res)
    //   //this.generateNotification(movieData);
    //   if(favorite) {
    //     this.store.dispatch({type:'ADD_TO_FAVS', payload: id});
    //   }
    //   else {
    //     this.store.dispatch({type:'REMOVE_FROM_FAVS', payload: id});
    //   }
    // });
	}

  public markFav(movieData, userView): void {
    if(!this.state.sessionId) {
      this.uiNotifications.warning(...['Sorry', 'You need to login to edit records']);
      return;
    }
    let data, url;
    let isWatchItem = movieData.watchList
    if(!isWatchItem) {
      url = 'favorite';
      data = {media_type: 'movie', media_id: movieData.id, favorite: movieData.favorite};
    }
    else {
      url = 'watchlist';
      data = {media_type: 'movie', media_id: movieData.id, watchlist: movieData.includeInWatch};
    }
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers});
    this.http.post(
      (`${paths.apiUrl}/account/${this.state.userId}/${url}${paths.apiKey}&session_id=${this.state.sessionId}`),
      //JSON.stringify(data),
      options
    )
    //.map(res => res.json())
    .subscribe(res => {
      this.generateNotification(movieData);
      if(!isWatchItem && userView) {
        this.store.dispatch({type:'REMOVE_FROM_FAVS', payload: movieData.id});
      }
      else if(isWatchItem && userView) {
        this.store.dispatch({type:'REMOVE_FROM_WATCHLIST', payload: movieData.id});
      }
    });
  }

  public generateNotification(data) {
    if(!data.watchList && data.favorite) {
      this.uiNotifications.success(...['Success', 'Marked as Favorite']);
    }
    else if(!data.watchList && !data.favorite) {
      this.uiNotifications.success(...['Success', 'Removed from Favorites']);
    }
    else if(data.watchList && data.includeInWatch) {
      this.uiNotifications.success(...['Success', 'Added in the Watchlist']);
    }
    else if(data.watchList && !data.includeInWatch) {
      this.uiNotifications.success(...['Success', 'Removed from Watchlist']);
    }
	}
	
	public getGenres() {
		return this.http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`);
	}

	public getMovies({userId, sessionId}) {
		return forkJoin(
			this.http.get(`${paths.apiUrl}/account/${userId}/favorite/movies?&api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=${sessionId}`),
			this.http.get(`${paths.apiUrl}/account/${userId}/watchlist/movies?&api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=${sessionId}`),
		);
	}
  public getUserMovies() {
    let dataFetched$ = new Observable();
    return Observable.create(observer => {
      if(localStorage.getItem('sessionId')) {
        return forkJoin(
           this.http.get(`${paths.apiUrl}/account/${localStorage.getItem('userId')}/favorite/movies?&api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=${localStorage.getItem('sessionId')}`),
           this.http.get(`${paths.apiUrl}/account/${localStorage.getItem('userId')}/watchlist/movies?&api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=${localStorage.getItem('sessionId')}`)
         )
         .subscribe((res: any) => {
           let [favs, watchList ] = res;
           let favIds = favs.results.map(movie=>movie.id);
           let watchIds = watchList.results.map(movie=>movie.id);
           res = [...res, {favIds: favIds}, {watchIds: watchIds}, {userId: localStorage.getItem('userId')}];
           this.store.dispatch({type:'LOADED_USER_LIST', payload: res});
           observer.next(null);
           observer.complete();
         },
         (error => {
           this.store.dispatch({type:'LOAD_ERROR', payload: error});
           observer.next(null);
           observer.complete();
         }));
      }
      else {
        observer.next(null);
        observer.complete();
      }

    });

  }
}
