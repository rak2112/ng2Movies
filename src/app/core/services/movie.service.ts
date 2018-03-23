import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { Store } from '@ngrx/store';
import * as moviesEntities from './../../core/actions/index';
import { 
	debounceTime, 
	distinctUntilChanged, 
	map,
	filter
	 } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { paths } from './locationPaths';
import {UtilService} from './util.service';
import { IMSelector, ISelectedFilters } from '../models/index';

@Injectable()
export class MovieService {
  filters: any;
  state: any;
  constructor(private http: HttpClient, private utilSvc: UtilService, private store: Store<any>) {
    store.select('movies')
      .subscribe((state: ISelectedFilters) => {
        this.state = state;
      });
  }

	public getMovies (filters): Observable<any> { 
		let { currentRoute, ...allFilters} = filters;
    switch(currentRoute) {
      case 'movies':
        return this.getAllMovies(allFilters);
      case 'popular':
        return this.getPopularMovies(allFilters);
      case 'upComing':
      	return this.getUpComingMovies(allFilters);
      case 'latest':
        return this.getLatestMovies(allFilters);
      case 'inCinemas':
        return this.getInCinemas(allFilters);
      default:
        return this.getAllMovies(allFilters);
    }
	}

  public searchMovies(movieName: string){
		return this.http.get(`${paths.apiUrl}/search/multi${paths.apiKey}&language=en-US&query=${movieName}`)
   .map((data: any)=> { console.log('resssssssssss in svc', data);
      data.results.map((movie)=> {
        if(movie.release_date) {
          movie.releaseYear = new Date(movie.release_date).getFullYear();
        }
      });
      let movies = data.results.filter((movie)=> movie.media_type === 'movie');
      return {
        movie: movieName,
        movies
      }
    })
    //  .subscribe((res)=>{
    //     this.store.dispatch({type: 'TRIGGER_SEARCH', payload: res});
    //  });
  }


	
	public getGenres(): Observable<any> {
		return this.http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`)
	}
	
	public getAllMovies(filters):Observable<any> {
    return forkJoin(
      this.http.get(this.utilSvc.getFullUrl(filters, '/discover/movie')),
      this.http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`) // will be removed once guards will be in place on routes.
		);
	}
	
	public getLatestMovies({pageNo}: {pageNo: number}) {
    let { toDate, fromDate } = this.utilSvc.toFromDates(new Date());
    return forkJoin(
      this.http.get(`${paths.apiUrl}/discover/movie?primary_release_date.gte=${toDate}&primary_release_date.lte=${fromDate}&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`),
      this.http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`)
    );
  }

  public getPopularMovies(filters) {
    return forkJoin(
      this.http.get(this.utilSvc.getPopularUrl(filters)),
      this.http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`)
    );
  }

  public getUpComingMovies(filters) {
    return forkJoin(
      this.http.get(this.utilSvc.getFullUrl(filters, '/movie/upcoming')),
      this.http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`)
    );
  }

  public getInCinemas(filters) {
    return forkJoin(
      this.http.get(this.utilSvc.getCinemasUrl(filters)),
      this.http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`)
    );
  }


  public getMovieDetails(id: number) {
		return of(true);
    // forkJoin(
    //   this.http.get(`${paths.apiUrl}/movie/${id}${paths.apiKey}`)),
    //   this.http.get(`${paths.apiUrl}/movie/${id}/videos${paths.apiKey}`),
    //   this.http.get(`${paths.apiUrl}/movie/${id}/images${paths.apiKey}`).map((data)=> {
    //     let posters = (data.posters.length>6)? data.posters.slice(1, 6) : data.posters;
    //     return posters.map(res=>res.file_path);
    //   }),
    //   this.http.get(`${paths.apiUrl}/movie/${id}/casts${paths.apiKey}`)
    // )
    // .subscribe(res => {
    //   let details = {
    //     movieDetails: res[0],
    //     videos: res[1].results,
    //     images: res[2],
    //     cast: res[3].cast,
    //     crew: res[3].crew
    //   };
    //   this.store.dispatch({type:'DETAILS_LOADED', payload: details});
    // },
    // (error) => {
    //   this.store.dispatch({type:'ERROR_DETAILS', payload: error});
    // });

  }

  public dispatchFilters({type}) : string {
    switch(type) {
			case 'years':
				return `LoadMoviesByYear`;
			case 'otherFilters':
				return `LoadMoviesByOrder`;
			case 'remove_genres':
				return `LoadMoviesByRemovingGenres`;
			case 'noCurrentFilter':
				return;		
			default:
				return `LoadMoviesByAddingGenres`;
    }
  }
}
