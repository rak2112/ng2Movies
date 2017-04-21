import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/Observable/range';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/forkJoin';
import 'rxjs/add/Observable/throw';
import { paths } from './../shared/services/locationPaths';
import { IMovie, IMovies, ISelectedFilters } from './../shared/dataModels/index';

interface AppStore {
}
interface Input {
  request_token: string
};

@Injectable()
export class AuthService {
  filters: any;
  state: any;
  currentUser: boolean = false;
  userCredentials: {id: null, sessionId: null};
  some$: Observable<any>;
  constructor(private _http: Http, private store: Store<AppStore>) {
    store.select('authenticateUser')
      .subscribe((state: any) => { console.log('state of user intital', state);
        this.state = state;
      });
  }

  public authenticateUser(data) {
    this.some$ = this._http.get(`${paths.apiUrl}/authentication/token/new${paths.apiKey}`)
    .map(res => res.json())
    .mergeMap((res) : ObservableInput<any> => {
      let {request_token} = res;
      return this._http.get(`${paths.apiUrl}/authentication/token/validate_with_login${paths.apiKey}&username=${data.userName}&password=${data.password}&request_token=${res.request_token}`)
      .map(res => res.json())
      .mergeMap((res) => this._http.get(`${paths.apiUrl}/authentication/session/new${paths.apiKey}&request_token=${res.request_token}`))
    });
    this.some$
    .subscribe(res => {
      let { session_id } = res.json();
      this._http.get(`${paths.apiUrl}/account${paths.apiKey}&session_id=${session_id}`)
      .map(res => res.json())
      .subscribe(res=>{
        console.log('resssss after all', res);
        res.sessionId = session_id;
        localStorage.setItem('sessionId', session_id);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('userName', res.username);
        this.store.dispatch({type: 'USER_AUTHENTICATED', payload: res});
        this.authUser(res);
      },
      (error => {
        console.log('err', error);
      }));
    });
  }

  public getUser() {
    let sessionId = localStorage.getItem('sessionId');
    this._http.get(`${paths.apiUrl}/account${paths.apiKey}&session_id=${sessionId}`)
    .map(res => res.json())
    .subscribe(res => {
      res.sessionId = sessionId;
      this.authUser(res);
      this.store.dispatch({type: 'USER_AUTHENTICATED', payload: res});
    },
    error=> {
      this.store.dispatch({type: 'USER_LOGGED_OUT'});
    });
  }
  public authUser(userDetail): void {
    this.currentUser = true;
    this.userCredentials = userDetail;
  }
  public logOut(): void {
    localStorage.removeItem('sessionId');
    this.currentUser = false;
    this.store.dispatch({type: 'USER_LOGGED_OUT'});
  }
  public hasAuth(): boolean {
    return this.currentUser;
  }
  public getAuthByStorage(): string {
    return localStorage.getItem('sessionId');
  }
  public handleError(error: Response) {
    return Observable.throw(error);
  }

  public markFav(movieData): void {
    let data, url;
    if(!movieData.watchList) {
      url = 'favorite';
      data = {media_type: 'movie', media_id: movieData.id, favorite: movieData.favorite};
    }
    else {
      url = 'watchlist';
      data = {media_type: 'movie', media_id: movieData.id, watchlist: movieData.includeInWatch};
    }
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers});
    this._http.post(
      (`${paths.apiUrl}/account/${this.state.userId}/${url}${paths.apiKey}&session_id=${this.state.sessionId}`),
      JSON.stringify(data),
      options
    )
    .map(res => res.json())
    .subscribe(res => {console.log('resssss', res)});
  }

  public getUserMovies() { console.log('user state in getting details', this.state);
    let dataFetched$ = new Subject();
    return Observable.create(observer => {
      return Observable.forkJoin(
         this._http.get(`${paths.apiUrl}/account/${localStorage.getItem('userId')}/favorite/movies?&api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=${localStorage.getItem('sessionId')}`).map((res) => res.json()).catch(this.handleError),
         this._http.get(`${paths.apiUrl}/account/${localStorage.getItem('userId')}/watchlist/movies?&api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=${localStorage.getItem('sessionId')}`).map((res)=> res.json())
       )
       .subscribe((res: any) => {
         let [favs, watchList ] = res;
         let favIds = favs.results.map(movie=>movie.id);
         let watchIds = watchList.results.map(movie=>movie.id);
         //[...res, favIds, watchIds] = [...res, ...favIds, ...watchIds]
         res.favIds = favIds;
         res.watchIds = watchIds;
         console.log('ressssssssss',res);
         this.store.dispatch({type:'LOADED_USER_LIST', payload: res});
         observer.next(null);
         observer.complete();
       },
       (error => {
         this.store.dispatch({type:'LOAD_ERROR', payload: error});
       }));
    });
  }

  // public getUserSelection() { console.log('user state in getting details', this.state);
  //   Observable.forkJoin(
  //      this._http.get(`${paths.apiUrl}/account/${this.state.userId}/favorite/movies?&api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=${this.state.sessionId}`).map((res) => res.json()).catch(this.handleError),
  //      this._http.get(`${paths.apiUrl}/account/${this.state.userId}/watchlist/movies?&api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=${this.state.sessionId}`).map((res)=> res.json())
  //    )
  //    .subscribe((res) => {
  //      this.store.dispatch({type:'LOADED_USER_LIST', payload: res});
  //    },
  //    (error => {
  //      this.store.dispatch({type:'LOAD_ERROR', payload: error});
  //    }));
  // }
}
