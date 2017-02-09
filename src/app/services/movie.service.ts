import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/Observable/range';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/forkJoin';
import 'rxjs/add/Observable/throw';
import { paths } from './locationPaths';
import { UtilService } from './util.service';

interface filterState {
  selectedFilters:{}
}
@Injectable()
export class MovieService {
  filters: any;
  state: any;
  constructor(private _http: Http, private _utilSvc: UtilService, private store: Store<any>) {
    store.select('movieReducer')
      .subscribe((state: filterState) => {
        this.state = state;
      });
  }

  public getMovies (pageNo, currentRoute) {
    switch(currentRoute) {
      case 'movies':
        this.getAllMovies(pageNo);
        break;
      case 'popular':
        this.getPopularMovies(pageNo);
        break;
      case 'upComing':
        this.getUpComingMovies(pageNo);
        break;
      case 'latest':
        this.getLatestMovies(pageNo);
        break;
      case 'inCinemas':
        this.getInCinemas(pageNo);
        break;
    }
  }



  public searchMovies(movie: string) {
    return this._http.get(`${paths.apiUrl}/search/multi${paths.apiKey}&language=en-US&query=${movie}`)
             .map((res: Response)=>{
              let data = res.json().results;
              data.map((movie)=> {
                if(movie.release_date) {
                  movie.releaseYear = new Date(movie.release_date).getFullYear();
                }
              });
              return data.filter((movie)=> movie.media_type === 'movie');
             });
  }

  public getUrlYear(years) {
    let yearUrl = (years.id) ? `&primary_release_year=${years.id}` : '';
    return yearUrl;
  }
  public getUrlOrder(otherFilters) {
    let sortUrl = (otherFilters.id) ? `&sort_by=${otherFilters.id}` : '';
    return sortUrl;
  }
  public getUrlGenres(multiSelectors) {
    let totalGenres = multiSelectors.length;
    let genreUrl = ``;
    if(totalGenres) {
      for(let i=0;i<totalGenres; i++) {
        genreUrl += `&with_genres=${multiSelectors[i].id}`;
      }
    }
    else {
      genreUrl = '';
    }
    return genreUrl;
  }

  public getAllMovies(pageNo: number) { console.log('state', this.state);
    let baseUrl = `${paths.apiUrl}/discover/movie${paths.apiKey}&page=${pageNo}`;
    let { years, otherFilters, multiSelectors } = this.state.selectedFilters;
    let totalGenres = multiSelectors.length;

    let filterUrl = `${paths.apiUrl}/discover/movie${paths.apiKey}${this.getUrlYear(years)}${this.getUrlGenres(multiSelectors)}${this.getUrlOrder(otherFilters)}&page=${pageNo}`;
    let moviesUrl = (totalGenres || years.id || otherFilters.id) ? filterUrl : baseUrl;

    Observable.forkJoin(
      this._http.get(moviesUrl).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).map((res)=> res.json())
    ).subscribe((res) => {
        //console.log('data', res);
        this.store.dispatch({type:'LOAD_SUCCESS', payload: res});
      },
      (error => {
        this.store.dispatch({type:'LOAD_ERROR', payload: error});
      }));
  }

  public getPopularMovies(pageNo: number) {
    let baseUrl = `${paths.apiUrl}/discover/movie?sort_by=vote_average.desc&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`;
    let { years, otherFilters, multiSelectors } = this.state.selectedFilters;
    let totalGenres = multiSelectors.length;

    let filterUrl = `${paths.apiUrl}/discover/movie${paths.apiKey}${this.getUrlYear(years)}${this.getUrlGenres(multiSelectors)}&sort_by=vote_average.desc${this.getUrlOrder(otherFilters)}&page=${pageNo}`;
    let moviesUrl = (totalGenres || years.id || otherFilters.id) ? filterUrl : baseUrl;

    Observable.forkJoin(
      this._http.get(moviesUrl).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).map((res)=> res.json())
    )
    .subscribe((res) => {
      this.store.dispatch({type:'LOAD_SUCCESS', payload: res});
    },
    (error => {
      this.store.dispatch({type:'LOAD_ERROR', payload: error});
    }));
  }

  public getUpComingMovies(pageNo: number) {

    let baseUrl = `${paths.apiUrl}/movie/upcoming${paths.apiKey}&page=${pageNo}`;
    let { years, otherFilters, multiSelectors } = this.state.selectedFilters;
    let totalGenres = multiSelectors.length;

    let filterUrl = `${paths.apiUrl}/movie/upcoming${paths.apiKey}${this.getUrlYear(years)}${this.getUrlGenres(multiSelectors)}${this.getUrlOrder(otherFilters)}&page=${pageNo}`;
    let moviesUrl = (totalGenres || years.id || otherFilters.id) ? filterUrl : baseUrl;

    Observable.forkJoin(
      this._http.get(moviesUrl).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).map((res)=> res.json())
    )
    .subscribe((res) => {
      this.store.dispatch({type:'LOAD_SUCCESS', payload: res});
    },
    (error => {
      this.store.dispatch({type:'LOAD_ERROR', payload: error});
    }));
  }

  public getInCinemas(pageNo: number) {

    let baseUrl = `${paths.apiUrl}/movie/now_playing${paths.apiKey}&language=en-US&page=${pageNo}`;
    let { years, otherFilters, multiSelectors } = this.state.selectedFilters;
    let totalGenres = multiSelectors.length;

    let filterUrl = `${paths.apiUrl}/movie/now_playing${paths.apiKey}&language=en-US${this.getUrlYear(years)}${this.getUrlGenres(multiSelectors)}${this.getUrlOrder(otherFilters)}&page=${pageNo}`;
    let moviesUrl = (totalGenres || years.id || otherFilters.id) ? filterUrl : baseUrl;

    Observable.forkJoin(
      this._http.get(moviesUrl).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).map((res)=> res.json())
    )
    .subscribe((res) => {
      this.store.dispatch({type:'LOAD_SUCCESS', payload: res});
    },
    (error => {
      this.store.dispatch({type:'LOAD_ERROR', payload: error});
    }));
  }
  public getLatestMovies(pageNo: number) {
    let {toDate, fromDate} = this._utilSvc.toFromDates();
    Observable.forkJoin(
      this._http.get(`${paths.apiUrl}/discover/movie?primary_release_date.gte=${toDate}&primary_release_date.lte=${fromDate}&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).map((res)=> res.json())
    )
    .subscribe((res) => {
      this.store.dispatch({type:'LOAD_SUCCESS', payload: res});
    },
    (error => {
      this.store.dispatch({type:'LOAD_ERROR', payload: error});
    }));
  }

  public getMovieDetails(id: number) {
    Observable.forkJoin(
      this._http.get(`${paths.apiUrl}/movie/${id}${paths.apiKey}`).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/movie/${id}/videos${paths.apiKey}`).map((res)=> res.json()),
      this._http.get(`${paths.apiUrl}/movie/${id}/images${paths.apiKey}`).map((res)=> {
        let data = res.json();
        let posters = (data.posters.length>6)? data.posters.slice(1, 6) : data.posters;
        return posters.map(res=>res.file_path);
      }),
      this._http.get(`${paths.apiUrl}/movie/${id}/casts${paths.apiKey}`).map((res)=> res.json())
    )
    .subscribe(res => {
      let details = {
        movieDetails: res[0],
        videos: res[1].results,
        images: res[2],
        cast: res[3].cast,
        crew: res[3].crew
      };
      this.store.dispatch({type:'DETAILS_LOADED', payload: details});
    },
    (error) => {
      this.store.dispatch({type:'ERROR_DETAILS', payload: error});
    });

  }

  public dispatchFilters(item, currentRoute, pageNo) : void {
    switch(item.type) {
      case 'years':
      this.store.dispatch({type:'FILTER_CHANGED_YEARS', payload: item});
      break;
      case 'otherFilters':
      this.store.dispatch({type:'FILTER_CHANGED_OTHERS', payload: item});
      break;
      case 'remove_genres':
      this.store.dispatch({type:'FILTER_REMOVE_MULTI', payload:item});
      break;
      default:
      this.store.dispatch({type:'FILTER_ADD_MULTI', payload: item});
    }
    this.getMovies(pageNo, currentRoute);
  }

  public handleError(error: Response) {
    return Observable.throw(error);
  }
}
